export default class Container {
  service(name: string, service: any) {
    Object.defineProperty(this, name, {
      value: service,
      enumerable: true,
    });
  }
}
