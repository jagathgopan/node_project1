var db=require('../config/connection')
var collection=require('../config/collections')
var promise=require('promise');
const { resolve } = require('promise');
/*  const {reject} = require('promise'); 
 const {}= require('../routes/user'); 
  */
var objectId=require('mongodb').ObjectId
module.exports={
    
addProduct:(product, callback)=>{
    product.Price=parseInt(product.Price)
    db.get().collection('product').insertOne(product).then((data)=>{    
        callback(data.ops[0]._id)
        
    })  
},
getAllProducts:()=>{
    return new promise (async (resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        resolve(products)
    })
},
deleteProduct:(prodId)=>{
    return new promise ((resolve,reject)=>{
        console.log(prodId);
        console.log(objectId(prodId));
        db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(prodId)}).then((response)=>{
            console.log(response);
            resolve(response)   
        })
    })
},
getProductDetails:(prodId)=>{
    return new promise ((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(prodId)}).then((product)=>{
        resolve(product )
        console.log(product);
        })
    })
},
updateProduct:(prodId,prodDetails)=>{
    prodDetails.Price=parseInt(prodDetails.Price)
    return new promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION)
        .updateOne({_id:objectId(prodId)},{
            $set:{
                Name:prodDetails.Name,
                Category:prodDetails.Category,
                Description:prodDetails.Description,
                Price:prodDetails.Price
            }
         
        }).then((response)=>{
            resolve()
        })
    })
}
}


