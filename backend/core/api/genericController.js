exports.getResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { returnFields, ...parsedFields } = req.query;

    let filterQuery = {};
    let selectFields = '';

    if (Object.keys(parsedFields).length !== 0) {
      filterQuery = { ...parsedFields };
    }

    if (returnFields) {
      selectFields = returnFields.split(',').join(' '); // Convert comma-separated fields to space-separated string
    }

    // Ensure the _id field is excluded
    if (selectFields && !selectFields.includes('_id')) {
      selectFields += ' -_id'; // Exclude _id field from the selected fields
    }

    let dbQuery = resourceModel.find(filterQuery);

    if (selectFields) {
      dbQuery = dbQuery.select(selectFields);
    }

    const resources = await dbQuery.lean();

       // Map the "_id" field to "id" in the response
       const modifiedResources = resources.map(resource => {
        resource.id = resource._id;
        delete resource._id;
        return resource;
      });
  
      return res.status(200).json(modifiedResources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "An error occurred while fetching resources" });
  }
};





exports.createResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    // Check if the request body is an array for bulk inserts
    if (Array.isArray(req.body)) {
      // Insert multiple documents in bulk
      const insertedResources = await resourceModel.insertMany(req.body);
      res.status(201).json(insertedResources);
    } else {
      // Insert a single document
      const newResource = new resourceModel(req.body);
      const createdResource = await newResource.save();
      res.status(201).json(createdResource);
    }
  } catch (error) {
    console.error("Error creating resources:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.updateResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { id } = req.params;
    const { body } = req;

    // Check if the request body is an array for bulk updates
    if (Array.isArray(body)) {
      // Bulk updates
      const updatedResources = await Promise.all(
        body.map(async (update) => {
          const updatedResource = await resourceModel.findByIdAndUpdate(
            update._id,
            update,
            { new: true }
          );
          return updatedResource;
        })
      );

      res.status(200).json(updatedResources);
    } else {
      // Single update
      const updatedResource = await resourceModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updatedResource) {
        return res.status(404).json({ error: "Resource not found" });
      }

      res.status(200).json(updatedResource);
    }
  } catch (error) {
    console.error("Error updating resources:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.deleteResource = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { id } = req.params;
    const deletedResource = await resourceModel.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(204).end(); // 204 No Content for successful deletion
  } catch (error) {
    console.log("Error deleting resource:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.deleteResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    // Check if the request body contains IDs for bulk deletion
    if (Array.isArray(req.body)) {
      // Bulk deletion
      const deletedResources = await resourceModel.deleteMany({
        _id: { $in: req.body },
      });

      if (deletedResources.deletedCount === 0) {
        return res.status(404).json({ error: "Resources not found" });
      }

      res.status(200).json(deletedResources);
    } else {
      return res.status(400).json({
        error: "Invalid request data. Specify valid IDs in the request body.",
      });
    }
  } catch (error) {
    console.log("Error deleting resources:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};


exports.getResourceById = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { id } = req.params;
    const resource = await resourceModel.findById(id).lean();

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    return res.status(200).json(resource);
  } catch (error) {
    console.error("Error fetching resource by ID:", error);
    res.status(500).json({ error: "An error occurred while fetching resource" });
  }
};



exports.searchResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    // Example: Filtering resources based on 'category' field
    const { category } = req.query;
    const query = category ? { category } : {};

    const resources = await resourceModel.find(query).lean();

    return res.status(200).json(resources);
  } catch (error) {
    console.error("Error searching resources:", error);
    res.status(500).json({ error: "An error occurred while searching resources" });
  }
};


exports.sortResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    // Example: Sorting resources by 'createdAt' field in ascending order
    const resources = await resourceModel.find().sort({ createdAt: 1 }).lean();

    return res.status(200).json(resources);
  } catch (error) {
    console.error("Error sorting resources:", error);
    res.status(500).json({ error: "An error occurred while sorting resources" });
  }
};


exports.getResourceCount = async (req, res) => {


  const resourceModel = req.resourceModel;

  try {
    const parsedFields = req.query;

    const aggregationPipeline = [];

    // Check if there are no parsed fields
    if (Object.keys(parsedFields).length === 0) {
      // If no parsed fields, return total count of documents
      const totalCount = await resourceModel.countDocuments();
      return res.status(200).json({ count: totalCount });
    }

    // Iterate through the parsed fields and construct match stages for each field
    Object.entries(parsedFields).forEach(([key, value]) => {
      if (key !== "page" && key !== "limit") {
        // Exclude pagination parameters, add match stage for each parsed field
        const matchStage = { $match: { [key]: value } };
        aggregationPipeline.push(matchStage);
      }
    });

    // Add group stage to count documents
    aggregationPipeline.push({
      $group: {
        _id: null,
        count: { $sum: 1 } // Counting documents
      }
    });

    const countResult = await resourceModel.aggregate(aggregationPipeline);

    // Return the count
    if (countResult.length > 0) {
      return res.status(200).json({ count: countResult[0].count });
    } else {
      return res.status(200).json({ count: 0 }); // If no matching documents found
    }
  } catch (error) {
    console.error("Error counting by parsed fields:", error);
    res.status(500).json({ error: "An error occurred while counting by parsed fields" });
  }
};

// Partial update of resource fields
exports.updateResourceFields = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { id } = req.params;
    const { body } = req;

    // Check if the request body contains fields to update
    if (!Object.keys(body).length) {
      return res.status(400).json({ error: "No fields to update provided" });
    }

    const updatedResource = await resourceModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    return res.status(200).json(updatedResource);
  } catch (error) {
    console.error("Error updating resource fields:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};


exports.calculateField = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { fieldName, method, qFeild, qValue } = req.query;

    let fieldValues

    if (!fieldName || !method) {
      return res.status(400).json({ error: "Please provide fieldName and method" });
    }

    if(qFeild&&qValue){
      fieldValues = await resourceModel.find({[qFeild]:qValue}).select(fieldName).lean();
    }else{
      fieldValues = await resourceModel.find().select(fieldName).lean();
    }

    if (!fieldValues || fieldValues.length === 0) {
      return res.status(404).json({ error: "No resources found" });
    }

    let result;
    switch (method.toLowerCase()) {
      case 'sum':
        result = fieldValues.reduce((acc, obj) => acc + obj[fieldName], 0);
        break;
      case 'average':
        const sum = fieldValues.reduce((acc, obj) => acc + obj[fieldName], 0); 
        result = sum / fieldValues.length;
        break;
      case 'product':
        result = fieldValues.reduce((acc, obj) => acc * obj[fieldName], 1);
        break;
      case 'max':
        result = Math.max(...fieldValues.map(obj => obj[fieldName]));
        break;
      case 'min':
        result = Math.min(...fieldValues.map(obj => obj[fieldName]));
        break;
      case 'count':
        result = fieldValues.length;
        break;
      case 'median':
        const sortedValues = fieldValues.map(obj => obj[fieldName]).sort((a, b) => a - b);
        const mid = Math.floor(sortedValues.length / 2);
        result = sortedValues.length % 2 !== 0 ? sortedValues[mid] : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
        break;
      case 'mode':
        const valueMap = {};
        fieldValues.forEach(obj => {
          const val = obj[fieldName];
          valueMap[val] = (valueMap[val] || 0) + 1;
        });
        const modes = [];
        let maxCount = 0;
        for (const val in valueMap) {
          if (valueMap[val] > maxCount) {
            modes.length = 0;
            modes.push(val);
            maxCount = valueMap[val];
          } else if (valueMap[val] === maxCount) {
            modes.push(val);
          }
        }
        result = modes.length === Object.keys(valueMap).length ? 'No mode' : modes;
        break;
      default:
        return res.status(400).json({ error: "Invalid method provided" });
    }

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error calculating field:", error);
    res.status(500).json({ error: "An error occurred while calculating field" });
  }
};


exports.getFieldOccurrences = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { fieldName } = req.query;

    if (!fieldName) {
      return res.status(400).json({ error: "Please provide fieldName" });
    }

    const fieldValues = await resourceModel.find().select(fieldName).lean();

    if (!fieldValues || fieldValues.length === 0) {
      return res.status(404).json({ error: "No resources found" });
    }

    const valueMap = {};
    fieldValues.forEach(obj => {
      const val = obj[fieldName];
      valueMap[val] = (valueMap[val] || 0) + 1;
    });

    return res.status(200).json({ occurrences: valueMap });
  } catch (error) {
    console.error("Error finding field occurrences:", error);
    res.status(500).json({ error: "An error occurred while finding field occurrences" });
  }
};



exports.filterByTimeRange = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { startTime, endTime } = req.query;

    if (!startTime || !endTime) {
      return res.status(400).json({ error: "Please provide startTime and endTime" });
    }

    const filteredResources = await resourceModel.find({
      createdAt: { $gte: new Date(startTime), $lte: new Date(endTime) }
    }).lean();

    if (!filteredResources || filteredResources.length === 0) {
      return res.status(404).json({ error: "No resources found within the specified time range" });
    }

    return res.status(200).json({count:filteredResources.length,data:filteredResources});
  } catch (error) {
    console.error("Error filtering by time range:", error);
    res.status(500).json({ error: "An error occurred while filtering by time range" });
  }
};
