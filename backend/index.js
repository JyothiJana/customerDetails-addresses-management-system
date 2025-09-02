// server/index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Connect to SQLite database
const db = new sqlite3.Database('./customer.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//-------------------------Creating a new customer data-----------------------
app.post('/api/customers',(req,res)=>{
    const {first_name,last_name,phone_number} = req.body
    if(!first_name||!last_name||!phone_number){
        return res.status(400).json({error:"First name, last name, and phone number are required."})
    }
    const sqlQuery = `INSERT INTO customers (first_name,last_name,phone_number) VALUES (?,?,?)`
    db.run(sqlQuery,[first_name,last_name,phone_number],function(err){
        if(err){
            return res.status(500).json({error:err.message})
        }
        res.status(201).json({message:"Customer created Successfully",customer_id:this.lastID});
    })
})

//------------------------Getting customers by filters-------------------------------

app.get('/api/customers', (req, res) => {
    let { search = "", sortBy = "id", order = "ASC", page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const allowedSort = ["id", "first_name", "last_name", "phone_number"];
    if (!allowedSort.includes(sortBy)) sortBy = "id";

    order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const query = `
        SELECT * FROM customers
        WHERE first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ?
        ORDER BY ${sortBy} ${order}
        LIMIT ? OFFSET ?
    `;

    db.all(query, [`%${search}%`, `%${search}%`, `%${search}%`, limit, offset], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.get(`
            SELECT COUNT(*) as count 
            FROM customers 
            WHERE first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ?
        `, [`%${search}%`, `%${search}%`, `%${search}%`], (err, countResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                total: countResult.count,
                page,
                limit,
                customers: rows
            });
        });
    });
});

//-----------------------Get customer by id--------------------------------
app.get('/api/customers/:id',(req,res)=>{
    const customerId = req.params.id
    const sqlQueryCustomer = `SELECT * FROM customers WHERE id=?`
    db.get(sqlQueryCustomer,[customerId],function(err,customer){
        if(err){
            return res.status(400).json({error:err.message})
        }
        if(!customer){
            return res.status(404).json({error:"Customer Not Found"})
        }
        const addressQuery = `SELECT * FROM addresses WHERE customer_id=?`
        db.all(addressQuery,[customerId],function(err,address){
            if(err){
                return res.status(500).json({error:err.message})
            }
            res.json({
                ...customer,
                address:address || []
            })
        })
    })
})
//-------------------update customer details-------------------------------
app.put('/api/customers/:id',(req,res)=>{
    const customerId = req.params.id
    const {first_name,last_name,phone_number} = req.body
    const sqlQuery = `UPDATE customers SET first_name=?,last_name=?,phone_number=? WHERE id=?`
    db.run(sqlQuery,[first_name,last_name,phone_number,customerId],function(err){
        if(err){
            return res.status(500).json({error:err.message})
        }
        if(this.changes===0){
            return res.status(404).json({ error: "Customer not found" });
        }
        res.json({message:"Customer Updated Successfully"});
    })
})

//---------------------------delete a customer ------------------------------

app.delete('/api/customers/:id',(req,res)=>{
    const customerId=req.params.id
    const sqlQuery = `DELETE from customers WHERE id=?`
    db.run(sqlQuery,[customerId],function(err){
        if(err){
            return res.status(500).json({error:err.message})
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.json({ message: "Customer deleted successfully" });
    })
})

//-----------------Add a new address for a specific customer--------------
app.post('/api/customers/:id/addresses',(req,res)=>{
    const customerId = req.params.id
    const {address_details,city,state,pin_code} = req.body
    if(!address_details||!city||!state||!pin_code){
         return res.status(400).json({ error: "All address fields are required." });
    }
    db.get(`SELECT * FROM customers WHERE id=?`,[customerId],function(err,customer){
        if(err){
            return res.status(500).json({ error: err.message });
        }
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        const sqlQuery = `INSERT INTO addresses (customer_id,address_details,city,state,pin_code) VALUES (?,?,?,?,?)`
        db.run(sqlQuery,[customerId,address_details,city,state,pin_code],function(err){
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Address added successfully",
                addressId: this.lastID,
                customerId: customerId
            });
        })
    })
})
// ------------------- Get all addresses for a specific customer -------------------
app.get("/api/customers/:id/addresses", (req, res) => {
    const { id } = req.params;

    // First check if the customer exists
    db.get("SELECT * FROM customers WHERE id = ?", [id], (err, customer) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        const sql = `SELECT * FROM addresses WHERE customer_id = ?`;
        db.all(sql, [id], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                customerId: id,
                addresses: rows
            });
        });
    });
});

//-----------------------Update a specific address--------------------
app.put('/api/addresses/:addressId',(req,res)=>{
    const addressId = req.params.addressId
    const {address_details,city,state,pin_code} = req.body
    const sqlQuery = `
    UPDATE addresses SET address_details=?,city=?,state=?,pin_code=? WHERE id=?
    `
    db.run(sqlQuery,[address_details,city,state,pin_code,addressId],function(err){
        if(err){
            return res.status(500).json({error:err.message})
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Address not found" });
        }
        res.json({message:"Update Address Successfully"})
    })
})

//----------------------/api/addresses/:addressId-----------------
app.delete('/api/addresses/:addressId',(req,res)=>{
    const addressId = req.params.addressId
    const sqlQuery = `DELETE FROM addresses WHERE id=?`
    db.run(sqlQuery,[addressId],function(err){
        if(err){
            return res.status(500).json({error:err.message})
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Address not found" });
        }
        res.json({ message: "Address Deleted Successfully" });
    })
})