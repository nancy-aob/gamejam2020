const entityUtils = {
  filterChildren(parent, prefix) {
    return parent
      .children()
      .map(child => {log(child.name()); return child})
      .filter(child => child.name().startsWith(prefix))
  },

  isTouched(entity, pt) {
      let aabb = entity.worldAABB();
      let ray = entity.camera().screenRay(pt);
      if (ray.intersectsAABB(aabb).hit) {
        return true
      }
      for (let child of entity.children()) {
        if (child && entityUtils.isTouched(child, pt)) {
          return true
        }
      }
      return false
  },

  getTouched(entities, pt) {
    for (let ent of entities) {
      if (entityUtils.isTouched(ent, pt)) {
        return ent
      }
    }
    return null
  }
}