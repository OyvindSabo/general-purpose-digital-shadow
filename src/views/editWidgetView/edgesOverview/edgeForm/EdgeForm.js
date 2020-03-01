const NewEdgeInfoForm$ = ({ state, structure, edge }) => {
  if (structure.vertices.length < 2) {
    return div$(
      'You need to have at least two nodes before you can create an edge'
    );
  }
  const allNodeIds = structure.vertices.map(({ id }) => id);
  const colorInput$ = new Observable('black');
  const firstNodeInput$ = new Observable(
    edge ? edge.vertexIds[0] : allNodeIds[0]
  );
  const secondNodeInput$ = new Observable(
    edge ? edge.vertexIds[1] : allNodeIds[1]
  );
  const widthInput$ = new Observable(edge ? edge.width : 1);

  return InfoBox$(
    div$('New edge:').setStyle({ fontWeight: 'bold' }),
    br$(),
    div$('color:'),
    div$(
      input$(colorInput$)
        .setStyle({ width: '100%' })
        .onInput(({ value }) => {
          colorInput$.value = value;
        })
    ),
    br$(),
    div('Nodes:'),
    div$(
      select$(...allNodeIds.map(id => option$({ label: id, value: id })))
        .setProps({ value: firstNodeInput$ })
        .setStyle({
          width: '100%',
        })
        .onChange(({ value }) => {
          firstNodeInput$.value = value;
        })
    ),
    br$(),
    div$(
      select$(...allNodeIds.map(id => option$({ label: id, value: id })))
        .setProps({ value: secondNodeInput$ })
        .setStyle({
          width: '100%',
        })
        .onChange(({ value }) => {
          secondNodeInput$.value = value;
        })
    ),
    br$(),
    div$('Width'),
    div$(
      input$()
        .setProps({ type: 'number' })
        .setStyle({ width: '100%' })
        .onInput(({ value }) => {
          widthInput$.value = value;
        })
    ),
    br$(),
    button$('Create edge')
      .setStyle({ width: '100%' })
      .onClick(element => {
        state.createOrUpdateEdge({
          widgetId: structure.id,
          edge: {
            id: edge ? edge.id : `${Math.random()}${+new Date()}`,
            color$: new Observable(colorInput$.value),
            vertexIds: [
              new Observable(firstNodeInput$.value),
              new Observable(secondNodeInput$.value),
            ],
            width$: new Observable(widthInput$.value),
          },
        });
      })
  );
};
