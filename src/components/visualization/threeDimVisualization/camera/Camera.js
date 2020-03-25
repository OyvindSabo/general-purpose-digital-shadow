const Observable = include('src/libraries/observable/Observable.js');

const Camera = function({
  target = new Observable([0, 0, 0]),
  horizontalRotation$ = new Observable(0),
  verticalRotation$ = new Observable(0),
  distance$ = new Observabe(100),
  focalLength$ = new Observable(100),
}) {
  this.target = target;
  this.horizontalRotation$ = horizontalRotation$;
  this.verticalRotation$ = new Observable(
    Math.max(Math.min(verticalRotation$.value, Math.PI / 4), -Math.PI / 2)
  );
  this.distance$ = new Observable(
    Math.max(distance$.value, -focalLength$.value / 2)
  );
  this.focalLength$ = focalLength$;
  this.setDistance = distance => {
    this.distance$.value = Math.max(distance, -focalLength$.value / 2);
  };
  this.setVerticalRotation = verticalRotation => {
    this.verticalRotation$.value = Math.max(
      Math.min(verticalRotation, Math.PI / 2),
      -Math.PI / 2
    );
  };
};

module.exports = Camera;
