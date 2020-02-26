/* Global app state */
const state = new (function() {
  this.customDashboardWidgets = [
    new (function() {
      this.id = '0';
      this.vertices = [
        { id: 0, x: 0, y: 0, z: 0 },
        { id: 1, x: 0, y: 0, z: 100 },
        { id: 2, x: 0, y: 100, z: 0 },
        { id: 3, x: 100, y: 0, z: 0 },
      ];
      this.edges = [
        {
          color: 'blue',
          vertices: [this.vertices[0], this.vertices[1]],
          width: 2,
        },
        {
          color: 'blue',
          vertices: [this.vertices[0], this.vertices[2]],
          width: 2,
        },
        {
          color: 'blue',
          vertices: [this.vertices[0], this.vertices[3]],
          width: 2,
        },
        {
          color: 'blue',
          vertices: [this.vertices[1], this.vertices[2]],
          width: 2,
        },
        {
          color: 'blue',
          vertices: [this.vertices[1], this.vertices[3]],
          width: 2,
        },
        {
          color: 'blue',
          vertices: [this.vertices[2], this.vertices[3]],
          width: 2,
        },
      ];
      this.faces = [
        {
          color: 'rgba(128, 128, 255, 0.5)',
          vertices: [this.vertices[0], this.vertices[1], this.vertices[2]],
        },
        {
          color: 'rgba(128, 128, 255, 0.5)',
          vertices: [this.vertices[0], this.vertices[1], this.vertices[3]],
        },
        {
          color: 'rgba(128, 128, 255, 0.5)',
          vertices: [this.vertices[1], this.vertices[2], this.vertices[3]],
        },
        {
          color: 'rgba(128, 128, 255, 0.5)',
          vertices: [this.vertices[0], this.vertices[2], this.vertices[3]],
        },
      ];
    })(),
    new (function() {
      this.id = '1';
      this.vertices = [
        { id: 0, x: 0, y: 0, z: 0 },
        { id: 1, x: 0, y: 0, z: 100 },
        { id: 2, x: 0, y: 100, z: 0 },
        { id: 3, x: 100, y: 0, z: 0 },
      ];
      this.edges = [
        {
          color: 'red',
          vertices: [this.vertices[0], this.vertices[1]],
          width: 2,
        },
        {
          color: 'red',
          vertices: [this.vertices[0], this.vertices[2]],
          width: 2,
        },
        {
          color: 'red',
          vertices: [this.vertices[0], this.vertices[3]],
          width: 2,
        },
        {
          color: 'red',
          vertices: [this.vertices[1], this.vertices[2]],
          width: 2,
        },
        {
          color: 'red',
          vertices: [this.vertices[1], this.vertices[3]],
          width: 2,
        },
        {
          color: 'red',
          vertices: [this.vertices[2], this.vertices[3]],
          width: 2,
        },
      ];
      this.faces = [
        {
          color: 'rgba(255, 128, 128, 0.5)',
          vertices: [this.vertices[0], this.vertices[1], this.vertices[2]],
        },
        {
          color: 'rgba(255, 128, 128, 0.5)',
          vertices: [this.vertices[0], this.vertices[1], this.vertices[3]],
        },
        {
          color: 'rgba(255, 128, 128, 0.5)',
          vertices: [this.vertices[1], this.vertices[2], this.vertices[3]],
        },
        {
          color: 'rgba(255, 128, 128, 0.5)',
          vertices: [this.vertices[0], this.vertices[2], this.vertices[3]],
        },
      ];
    })(),
  ];
  this.createNewCustomDashboardWidget = () => {
    const id = `${Math.random()}${+new Date()}`;
    this.customDashboardWidgets.push({
      id,
      vertices: [],
      edges: [],
      faces: [],
    });
    return id;
  };
  this.deleteCustomDashboardWidgetById = id => {
    this.customDashboardWidgets = this.customDashboardWidgets.filter(
      structure => structure.id !== id
    );
  };
})();
