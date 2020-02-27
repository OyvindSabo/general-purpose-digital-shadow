const NewEdgeInfoForm$ = ({ state, structure }) => {
  if (structure.vertices.length < 2) {
    return div$(
      'You need to have at least two nodes before you can create an edge'
    );
  }
  const nodeIds = structure.vertices.map(({ id }) => id);
  const colorInput = new Observable('black');
  const firstNodeInput = new Observable(nodeIds[0]);
  const secondNodeInput = new Observable(nodeIds[1]);
  const widthInput = new Observable(1);

  return InfoBox$(
    div$('New edge:').setStyle({ fontWeight: 'bold' }),
    br$(),
    div$('color:'),
    div$(
      input$(colorInput)
        .setStyle({ width: '100%' })
        .onInput(({ value }) => {
          colorInput.value = value;
        })
    ),
    br$(),
    div('Nodes:'),
    div$(
      select$(...nodeIds.map(id => option$({ label: id, value: id })))
        .setProps({ value: firstNodeInput })
        .setStyle({
          width: '100%',
        })
        .onChange(({ value }) => {
          firstNodeInput.value = value;
        })
    ),
    br$(),
    div$(
      select$(...nodeIds.map(id => option$({ label: id, value: id })))
        .setProps({ value: secondNodeInput })
        .setStyle({
          width: '100%',
        })
        .onChange(({ value }) => {
          secondNodeInput.value = value;
        })
    ),
    br$(),
    div$('Width'),
    div$(
      input$()
        .setProps({ type: 'number' })
        .setStyle({ width: '100%' })
        .onInput(({ value }) => {
          widthInput.value = value;
        })
    ),
    br$(),
    button$('Create edge')
      .setStyle({ width: '100%' })
      .onClick(element => {
        state.createEdge({
          widgetId: structure.id,
          edge: {
            color: colorInput.value,
            vertexIds: [firstNodeInput.value, secondNodeInput.value],
            width: widthInput.value,
          },
        });
      })
  );
};
