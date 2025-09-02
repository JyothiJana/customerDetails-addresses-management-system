const sqlite3 = require('sqlite3').verbose()


const db = new sqlite3.Database('./customer.db',(err)=>{
    if(err){
        console.log("error occured:",err.message)
    }
    else{
        console.log("connected to sqlite server")
    }
})

db.run("PRAGMA foreign_keys = ON");

db.serialize(()=>{
    db.run(`DROP TABLE IF EXISTS addresses`);
    db.run(`DROP TABLE IF EXISTS customers`);


    db.run(
        `
            CREATE TABLE IF NOT EXISTS customers(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            phone_number TEXT NOT NULL UNIQUE
            )
    `
    );
    db.run(`
        CREATE TABLE IF NOT EXISTS addresses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER ,
        address_details TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        pin_code TEXT NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
        )
        
        `);

    const customerstmt = db.prepare(`
            INSERT INTO customers (first_name,last_name,phone_number) VALUES (?,?,?)
        `);
    const customers = [
        ["Durga","Jana","81792323445"],
        ["Jyothi","Jana","9809090909"],
        ["Siddhu","Narayana","9001221345"],
        ["Nandhu","Gopal","9087567909"],
        ["Ravi", "Kumar", "9876543210"],
        ["Anusha", "Reddy", "9123456789"],
        ["Kiran", "Shetty", "9011223344"],
        ["Meena", "Sharma", "8899776655"],
        ["Vikram", "Varma", "9900112233"],
        ["Pooja", "Nair", "9345678123"],
        ["Harsha", "Patel", "9456123789"],
        ["Suman", "Das", "9081234567"],
        ["Deepa", "Chowdhury", "9798989898"],
        ["Rajesh", "Gupta", "9654321876"],
        ["Swathi", "Menon", "9005674321"],
        ["Arjun", "Singh", "9234567890"],
        ["Sneha", "Verma", "9321456789"],
        ["Praveen", "Rao", "9543210987"],
        ["Kavya", "Iyer", "9789012345"],
        ["Manoj", "Joshi", "9678901234"],
        ["Divya", "Pillai", "9212345678"],
        ["Sandeep", "Chatterjee", "9345098761"],
        ["Rohit", "Mishra", "9890123456"],
        ["Nisha", "Chauhan", "9765432109"]

    ]
    customers.forEach(cust=>customerstmt.run(...cust));
    customerstmt.finalize();

    const addressStmt = db.prepare(`
        INSERT INTO addresses (customer_id, address_details, city, state, pin_code)
        VALUES (?, ?, ?, ?, ?)    
        `);
    const addresses = [
        [1, "H.No 123, Lake View Colony", "Hyderabad", "Telangana", "500032"],
        [1, "Flat 7B, Rainbow Apartments", "Hyderabad", "Telangana", "500070"],

        [2, "Sector 12, Dwarka", "Delhi", "Delhi", "110078"],

        [3, "Near Forum Mall, Koramangala", "Bangalore", "Karnataka", "560095"],
        [3, "5th Block, Jayanagar", "Bangalore", "Karnataka", "560041"],

        [4, "DLF Cyber City, Phase 2", "Gurgaon", "Haryana", "122002"],

        [5, "Kothrud, Paud Road", "Pune", "Maharashtra", "411038"],
        [5, "Baner Road, Near IT Hub", "Pune", "Maharashtra", "411045"],

        [6, "Salt Lake Sector V", "Kolkata", "West Bengal", "700091"],

        [7, "Anna Nagar East", "Chennai", "Tamil Nadu", "600040"],
        [7, "Besant Nagar Beach", "Chennai", "Tamil Nadu", "600090"],

        [8, "Hazratganj Main Market", "Lucknow", "Uttar Pradesh", "226001"],

        [9, "Andheri East, Marol", "Mumbai", "Maharashtra", "400059"],
        [9, "Powai Lake, IIT Campus", "Mumbai", "Maharashtra", "400076"],

        [10, "Whitefield ITPL", "Bangalore", "Karnataka", "560066"],

        [11, "Gachibowli, Near Infosys", "Hyderabad", "Telangana", "500032"],
        [11, "Madhapur, Kavuri Hills", "Hyderabad", "Telangana", "500081"],

        [12, "Civil Lines, Near High Court", "Allahabad", "Uttar Pradesh", "211001"],

        [13, "Banjara Hills Road No. 12", "Hyderabad", "Telangana", "500034"],

        [14, "Vasant Kunj, Pocket D", "Delhi", "Delhi", "110070"],
        [14, "Connaught Place, Block A", "Delhi", "Delhi", "110001"],

        [15, "Kalyani Nagar", "Pune", "Maharashtra", "411014"],

        [16, "South Extension Part 2", "Delhi", "Delhi", "110049"],

        [17, "HSR Layout, Sector 2", "Bangalore", "Karnataka", "560102"],
        [17, "BTM Layout, 2nd Stage", "Bangalore", "Karnataka", "560076"],

        [18, "Park Street, Near Metro", "Kolkata", "West Bengal", "700016"],

        [19, "Adyar, LB Road", "Chennai", "Tamil Nadu", "600020"],

        [20, "Charminar, Pathergatti", "Hyderabad", "Telangana", "500002"]
        ];

    addresses.forEach(add=>addressStmt.run(...add));
    addressStmt.finalize();


})

db.close();