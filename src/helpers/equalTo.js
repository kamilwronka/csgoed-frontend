export function equalTo(ref, msg) {
  return this.test({
    name: "equalTo",
    exclusive: false,
    message: msg || `${ref.path} must be the same as ${ref.path}`,
    params: {
      reference: ref.path
    },
    test: function(value) {
      return value === this.resolve(ref);
    }
  });
}
