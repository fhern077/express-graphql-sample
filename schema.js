const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");

const CustomerType = new GraphQLObjectType({
  name: "customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLString } },
      // resolve(parentVal, args) {
      //   for (const customer of customers) {
      //     if (customer.id === args.id) {
      //       return customer;
      //     }
      //   }
      // }
      resolve(partnerVal, args) {
        return axios
          .get(`http://localhost:4001/customers/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
