import { Injectable } from '@angular/core';
import {Event} from '../../models/event';

class Cluster {
  nodes: { [key: string]: Node };
  width: number;
  maxCliqueSize: number;

  constructor() {
    this.nodes = {};
    this.width = 0;
    this.maxCliqueSize = 1;
  }
}

class Node {
  id: string;
  event: Event;
  neighbours: { [key: string]: Node };
  cluster: Cluster;
  position: number;
  biggestCliqueSize: number;

  constructor(event: Event) {
    this.id = event.id;
    this.event = event;
    this.neighbours = {};
    this.cluster = null;
    this.position = null;
    this.biggestCliqueSize = 1;
  }
}

class Graph {
  clusters: Cluster[];
  nodes: { [key: string]: Node };

  constructor() {
    this.clusters = [];
    this.nodes = {};
  }
}

@Injectable({
  providedIn: 'root'
})
export class DayEventsService {
  events: Event[];
  height: number;
  width: number;

  constructor() {
  }

  initLayout(height: number, width: number) {
    this.height = height;
    this.width = width;
  }

  processEvents(events: Event[]): Event[] {
    this.events = events.map((event: Event) => new Event(event))
      .sort((a: Event, b: Event) => (a.start - b.start));

    const processed: Event[] = [];
    const histogram = this.createHistogram();
    const graph = this.createGraph(histogram);
    this.setClusterWidth(graph);
    this.setNodesPosition(graph);

    Object.keys(graph.nodes).forEach((nodeId: string) => {
      const node = graph.nodes[nodeId];

      node.event.height = node.event.end - node.event.start;
      node.event.left = node.position * node.cluster.width;
      node.event.width = node.cluster.width;

      processed.push(node.event);
    });

    this.events = processed;

    return processed;
  }

  private createHistogram(): string[][] {
    const minutes = [];
    for (let i = 0; i < this.height; i++) {
      minutes[i] = [];
    }

    // Set events that occur at the specific minute
    this.events.forEach((event) => {
      for (let i = event.start; i <= event.end - 1; i++) {
        minutes[i].push(event.id);
      }
    });

    return minutes;
  }

  private createGraph(minutes: string[][]) {
    const graph: Graph = new Graph();
    const nodeMap: { [key: string]: Node } = {};

    this.events.forEach((event: Event) => {
      const node = new Node(event);
      nodeMap[node.id] = node;
    });

    let cluster;

    minutes.forEach((minuteEvents: string[]) => {
      if (minuteEvents.length > 0) {
        cluster = cluster || new Cluster();
        minuteEvents.forEach((eventId: string) => {
          if (!cluster.nodes[eventId]) {
            cluster.nodes[eventId] = nodeMap[eventId];

            nodeMap[eventId].cluster = cluster;
          }
        });
      } else {
        if (cluster) {
          graph.clusters.push(cluster);
        }

        cluster = null;
      }
    });

    if (cluster) {
      graph.clusters.push(cluster);
    }

    minutes.forEach((minuteEvents: string[]) => {
      minuteEvents.forEach((eventId: string) => {
        const sourceNode = nodeMap[eventId];

        sourceNode.biggestCliqueSize = Math.max(sourceNode.biggestCliqueSize, minuteEvents.length);
        minuteEvents.forEach((targetEventId: string) => {
          if (eventId !== targetEventId) {
            sourceNode.neighbours[targetEventId] = nodeMap[targetEventId];
          }
        });
      });
    });

    graph.nodes = nodeMap;

    return graph;
  }

  private setClusterWidth(graph: Graph): void {
    graph.clusters.forEach((cluster: Cluster) => {
      let maxCliqueSize = 1;
      Object.keys(cluster.nodes).forEach((nodeId: string) => {
        maxCliqueSize = Math.max(maxCliqueSize, cluster.nodes[nodeId].biggestCliqueSize);
      });

      cluster.maxCliqueSize = maxCliqueSize;
      cluster.width = 100 / maxCliqueSize;
    });
  }

  private setNodesPosition(graph: Graph): void {
    graph.clusters.forEach((cluster: Cluster) => {
      Object.keys(cluster.nodes).forEach((nodeId: string) => {
        const node = cluster.nodes[nodeId];
        const positionArray = new Array(node.cluster.maxCliqueSize);

        Object.keys(node.neighbours).forEach((neighbourId: string) => {
          const neighbour = node.neighbours[neighbourId];
          if (neighbour.position !== null) {
            positionArray[neighbour.position] = true;
          }
        });

        for (let i = 0; i < positionArray.length; i++) {
          if (!positionArray[i]) {
            node.position = i;
            break;
          }
        }
      });
    });
  }
}
