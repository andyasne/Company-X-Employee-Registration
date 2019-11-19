/**
 * @author              Andinet 
 * @name                companyXEmployeeRegistration
 * @module              employee.js
 * @description         DAL for employee route.
 * @kind                DAL
 * @copyright           2019
 */

let Model = require('../model/employee');

/**
 * @name                - Create
 * @description         - Creates new employee
 * @param data          - Initial data
 * @param callback      - Callback function (error,data)
 */
exports.create                  = function create(data,callback)                            {
    Model.create(data,callback);
};

/**
 * @name                - Get public
 * @description         - Retrieves employee data that is public (some attributes may be hidden)
 * @param query         - Query
 * @param callback      - Callback function (error,data)
 */
exports.getPublic               = function getPublic(query, callback)                       {
    Model.findOne(query,callback).select('');
};

/**
 * @name                - Get private
 * @description         - Retrieves private employee data
 * @param query         - Query
 * @param callback      - Callback function (error,data)
 */
exports.getPrivate              = function getPrivate(query, callback)                      {
    Model.findOne(query, callback);
};

/**
 * @name                - Get collections Paginated
 * @description         - Retrieves employee paginated data (public data - Attributes may be hidden)
 * @param query         - Query
 * @param option        - Pagination option (View documentation to view these options)
 * @param callback      - Callback function (error,data)
 */
exports.getCollectionsPaginated = function getCollectionsPaginated(query,option,callback)   {
    Model.paginate(query,option,function (err,data) {
        callback(err, data);
    });
};

/**
 * @name                - Get all collection
 * @description         - Retrieves all data that matches the query
 * @param query         - Query to look for.
 * @param callback      - Callback function (error,datas)
 */
exports.getAllCollection        = function getAllCollection(query, callback)                {
    Model.find(query,callback).select('');
};

/**
 * @name                - Count
 * @description         - Count documents based on query
 * @param query         - Query
 * @param callback      - Callback function (error,count)
 */
exports.count = function (query, callback) {
    Model.countDocuments(query,callback);
};

/**
 * @name                - Update
 * @description         - Finds one employee that matches query and updates
 * @param query         - Query
 * @param updateData    - Update data
 * @param callback      - Callback function (error,data)
 */
exports.update                  = function update(query,updateData,callback)                {
    Model.findOneAndUpdate(query, updateData, {new: true}, callback).select('');
};

/**
 * @name                - Update many
 * @description         - Finds all employee data that matches query and update
 * @param query         - Query
 * @param updateData    - Update data
 * @param callback      - Callback function (error,data)
 */
exports.updateMany              = function updateMany(query,updateData,callback)            {
    Model.updateMany(query, updateData, callback);
};

/**
 * @name                - Remove
 * @description         - Finds employee and removes.
 * @param query         - Query
 * @param callback      - Callback function (error,data)
 */
exports.remove                  = function remove(query,callback)                           {
    Model.findOneAndRemove(query,callback).select('');
};

/**
 * @name                - Remove many
 * @description         - Removes all employee document that matches query
 * @param query         - Query
 * @param callback      - Callback function (error,data)
 */
exports.removeMany              = function removeMany(query,callback)                       {
    Model.deleteMany(query,callback);
};

/**
 * @name                - Push to array
 * @description         - Pushes elements to the targeted array
 * @param query         - Query
 * @param targetedArray - Targeted array
 * @param elements      - Elements to push
 * @param callback      - Callback function (error)
 */
exports.pushToArray             = function (query, targetedArray,elements,callback) {
    Model.findOne(query,function (err, data) {
        if(!data[targetedArray].includes(...elements)) {
            data[targetedArray].push(...elements);
        }
        data.markModified(targetedArray);
        data.save();
        callback(err,data);
    });
};

/**
 * @name                - Pull from array
 * @description         - Pulls elements from the targeted array
 * @param query         - Query
 * @param targetedArray - Targeted array
 * @param elements      - Elements to pull
 * @param callback      - Callback function (error)
 */
exports.pullFromArray             = function (query, targetedArray,elements,callback) {
    Model.findOne(query,function (err, data) {
        data[targetedArray].pull(...elements);
        data.markModified(targetedArray);
        data.save();
        callback(err,data);
    });
};
