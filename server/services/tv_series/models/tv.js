'use strict';
const { getDatabase } = require('../config/config');
const Tv = getDatabase().collection(process.env.COLLECTION_NAME);
const { ObjectId } = require('mongodb');

class TvModel {
  static find() {
    return Tv.find().toArray();
  }

  static findById(id) {
    return Tv.findOne({ _id: ObjectId(id) });
  }

  static create(data) {
    return Tv.insertOne(data);
  }

  static findByIdAndUpdate(id, updatedData) {
    return Tv.updateOne({ _id: ObjectId(id) }, { $set: updatedData });
  }

  static findByIdAndDelete(id) {
    return Tv.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = TvModel;
