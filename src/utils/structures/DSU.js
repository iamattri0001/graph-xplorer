//Disjoint set with path compression and union by size
class DSU {
  constructor(nodesArray) {
    this.size = {};
    this.par = {};

    nodesArray.forEach((node) => {
      this.size[node] = 1;
      this.par[node] = node;
    });
  }

  getPar = (node) => {
    if (this.par[node] === node) return node;

    return (this.par[node] = this.getPar(this.par[node])); //path compression
  };

  merge = (node1, node2) => {
    node1 = this.getPar(node1);
    node2 = this.getPar(node2);

    if (node1 === node2) {
      //already in same set
      return;
    }

    //union by size
    if (this.size[node1] < this.size[node2]) {
      this.size[node2] += this.size[node1];
      this.par[node1] = node2;
    } else {
      this.size[node1] += this.size[node2];
      this.par[node2] = node1;
    }
  };

  getSize = (node) => {
    return this.size[this.getPar(node)];
  };

  areConnected = (node1, node2) => {
    return test.getPar(node1) === this.getPar(node2);
  };
}

export default DSU;
