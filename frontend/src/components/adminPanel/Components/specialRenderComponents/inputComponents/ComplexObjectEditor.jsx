import React from 'react';
import { Formik, Field, FieldArray } from 'formik';

const renderField = (field, value, handleChange) => {
  switch (field.type) {
    case 'string':
    case 'number':
      return (
        <input
          type={field.type}
          value={value}
          onChange={handleChange}
          placeholder={field.title}
          className="border rounded-md p-2 mb-2"
        />
      );
    case 'object':
      return (
        <div className="mb-4" key={field.name}>
          <h3 className="text-lg font-bold mb-2">{field.title}</h3>
          <div className="ml-4">
            {field.schema.map((subField) => (
              <Field
                key={subField.name}
                name={`${field.name}.${subField.name}`}
              >
                {({ field: { value: subValue, onChange: subOnChange } }) => (
                  <div key={subField.name}>
                    {renderField(subField, subValue, subOnChange)}
                  </div>
                )}
              </Field>
            ))}
          </div>
        </div>
      );

    case 'object array':
      return (
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">{field.title}</h3>
          <FieldArray name={field.name}>
            {({ push, remove, form }) => (
              <div className="ml-4">
                {value.map((item, index) => (
                  <div key={index} className="mb-2">
                    {field.schema.map((subField) => (
                      <Field key={subField.name} name={`${field.name}.${index}.${subField.name}`}>
                        {({ field: { value: subValue, onChange: subOnChange } }) => (
                          <div className="ml-4" key={subField.name}>
                            {renderField(subField, subValue, subOnChange)}
                          </div>
                        )}
                      </Field>
                    ))}
                    <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white rounded-md px-2 py-1 mt-2">
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push({})} className="bg-green-500 text-white rounded-md px-2 py-1">
                  Add
                </button>
              </div>
            )}
          </FieldArray>
        </div>
      );
    default:
      return null;
  }
};


const initializeNestedValues = (schema, data) => {
  const initialValues = {};

  schema.forEach((field) => {
    if (field.type === 'object') {
      initialValues[field.name] = {}; // Initialize object field
      field.schema.forEach((subField) => {
        initialValues[field.name][subField.name] = data[field.name][subField.name] || '';
      });
    } else if (field.type === 'object array') {
      // Leave object array handling as it is
      initialValues[field.name] = data[field.name].map((item) => {
        const newItem = {};
        field.schema.forEach((subField) => {
          newItem[subField.name] = item[subField.name] || '';
        });
        return newItem;
      });
    } else {
      initialValues[field.name] = data[field.name] || ''; // For non-object fields
    }
  });

  return initialValues;
};





const ComplexObjectEditorFormik = ({ schema, initialData }) => {
  const initialValues = initializeNestedValues(schema, initialData);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values) => {
        console.log('Form submitted with values:', values);
      }}
    >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="p-4">
          {schema.map((field) => (
            <div key={field.name}>
              {renderField(field, values[field.name], (e) => {
                values[field.name] = e.target.value;
              })}
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default ComplexObjectEditorFormik;
