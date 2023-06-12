import express from 'express';
import http from 'http';
import pool from './db.js';

const app = express();

app.use(express.json()); 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const employees = await pool.query("SELECT * FROM employees");
    res.render('index', { employees: employees.rows });
});

app.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
    const payroll = await pool.query("SELECT * FROM payroll WHERE employee_id = $1", [id]);
    let [payrollData] = payroll.rows
    if (!payrollData) {
        payrollData = {
            employee_id: id,
            month: '',
            year: '',
            hours_worked: '',
            deductions: ''
        }
    }
    res.render('employee', { employee: employee.rows[0], payroll: payrollData });
});

app.post('/employees', async (req, res) => { 
    const { name, designation, department, salary } = req.body;
    const data = await pool.query(
        "INSERT INTO employees (name, designation, department, salary) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, designation, department, salary]
    );
    res.redirect('/');
});

app.post('/payroll', async (req, res) => {
    const { employee_id, month, year, hours_worked, deductions } = req.body;
    
    const data = await pool.query(
        "INSERT INTO payroll (employee_id, month, year, hours_worked, deductions) VALUES ($1, $2, $3, $4, $5) ON CONFLICT ($1) DO UPDATE SET employee_id = $1, month = $2, year = $3, hours_worked = $4, deductions = $5;",
        [employee_id, month, year, hours_worked, deductions]
    );
    res.redirect('/employees/' + employee_id);
});

app.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;

    await pool.query("DELETE FROM payroll WHERE employee_id = $1", [id]);
    await pool.query("DELETE FROM employees WHERE id = $1", [id]); 
    res.redirect('/');
});
 
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);
