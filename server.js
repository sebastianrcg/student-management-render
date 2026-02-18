const express = require('express');
const cors = require('cors');
const Pool = require('pg').Pool;
const path = require('path');
const morgan = require('morgan');


const app = express();

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

const PORT = process.env.PORT || 5000;

//Render database internal connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false //don't check for ssl cert
    }
});

//Previous local connection
// const pool = new Pool({
//     host: "localhost",
//     user: "postgres",
//     password: "postgres",
//     database: "students",
//     port: 5432
// });

app.post('/add_user', (req, res)=>{
    const sql = "INSERT INTO student_details (name, email, age, gender) VALUES ($1,$2,$3,$4) returning *";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ];

    pool.query(sql, values, (error, results)=>{
        if (error) return res.json({message: 'Something unexpected has ocurred' + error});
        return res.json({success: "Student added successfully"})
})
})

app.get('/students', (req, res)=>{
    const sql = 'SELECT * FROM student_details order by id asc';
    pool.query(sql, (error, results)=>{
        if (error) res.json({message: "Server Error"});
        return res.json(results.rows);
    })
})

app.get('/get_student/:id', (req, res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM student_details WHERE id=$1`;
    pool.query(sql, [id] , (error, results)=>{
        if (error) res.json({message: "Something went wrong"});
        return res.json(results.rows);
    })
})

app.put('/update_user/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        req.body.status

    ]
    const sql = `UPDATE student_details set name=$1, email=$2, age=$3, gender=$4, status=$5 where id=${id}`;
    pool.query(sql, values, (error, results)=>{
        if (error) res.json({message: "Something went wrong"});
        return res.json({success: "Student Updated"});
    })
});

app.delete('/delete_user/:id', (req, res)=>{
    const id = req.params.id;
    const sql = `DELETE from student_details where id=${id}`;
    pool.query(sql, (error, results)=>{
        if (error) res.json({message: "Something went wron"});
        return res.json({success: "Student Deleted"});
    })
})

app.listen(PORT, ()=> {
    console.log(`Server listening on Port: ${PORT}`);
});