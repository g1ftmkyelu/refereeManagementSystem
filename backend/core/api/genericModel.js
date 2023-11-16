const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

exports.generateModel = (resourceName,schema) => {
  try {
    schema.plugin(paginate);
    const resourceModel = mongoose.model(resourceName, schema);
    return resourceModel;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
