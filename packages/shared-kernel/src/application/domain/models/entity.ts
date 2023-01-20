abstract class Entity {
  toObject() {
    return { ...this };
  }
}

export default Entity;
