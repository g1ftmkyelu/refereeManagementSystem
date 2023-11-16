const express = require("express");
const { generateModel } = require("./genericModel");
const {
  getResources,
  createResources,
  updateResources,
  deleteResource,
  deleteResources,
  getResourceById, 
  searchResources, 
  sortResources,
  getResourceCount, 
  updateResourceFields,
  calculateField,
  getFieldOccurrences,
  filterByTimeRange
} = require("./genericController");

const router = express.Router();
const { auth } = require("../../middlewares/authorization");


function setupDynamicRoutes(resource) {
  const { name, endpoint, schema } = resource;
  const resourceModel = generateModel(name, schema);
  

  router.use((req, res, next) => {
    req.resourceModel = resourceModel;
    next();
  });

  router.get(`/${endpoint}`, auth, getResources);
  router.get(`/${endpoint}/filterByTime`, auth, filterByTimeRange)
  router.get(`/${endpoint}/fieldOcurrences`, auth, getFieldOccurrences)
  router.get(`/${endpoint}/calculate`, auth, calculateField)
  router.get(`/${endpoint}/count`, auth, getResourceCount); 

  router.get(`/${endpoint}/:id`, auth, getResourceById); 

  router.post(`/${endpoint}`, auth, createResources);

  router.put(`/${endpoint}/:id`, auth, updateResources);
  router.patch(`/${endpoint}/:id`, auth, updateResourceFields);


  router.delete(`/${endpoint}`, auth, deleteResources);
  router.delete(`/${endpoint}/:id`, auth, deleteResource);

  router.get(`/${endpoint}/search`, auth, searchResources); 
  router.get(`/${endpoint}/sort`, auth, sortResources); 

  return router;
}

module.exports = { setupDynamicRoutes };
