import Student from "../models/studentModel.js";

export const createStudent = async (req, res) => {
  const { name, email } = req.body;

  const emailReg = /^[^@\s\.]+@[^@\s\.]+\.[^@\s\.]+$/;

  if (!name?.trim() || !email?.trim()) {
    return res
      .status(400)
      .json({ error: { message: "Please provide a valid name and email" } });
  }
  if (!emailReg.test(email.trim())) {
    return res.status(400).json({ error: { message: "Invalid email format" } });
  }
  try {
    const studentName = await Student.findOne({ name: name });

    if (studentName) {
      return res.status(409).json({
        error: { message: `Name: ${studentName.name}, already exists` },
      });
    }

    const studentEmail = await Student.findOne({ email: email });

    if (studentEmail) {
      return res.status(409).json({
        error: { message: `Email: ${studentEmail.email}, already exists` },
      });
    }

    const count = await Student.countDocuments();

    const studentIdGen = `STD-${String(count + 1).padStart(4, "0")}`;

    const newStudent = await Student.create({
      name,
      email,
      studentId: studentIdGen,
    });

    res.status(201).json({
      ok: true,
      message: "Student succesfully created",
      data: newStudent,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get students

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 });
    res
      .status(200)
      .json({ ok: true, message: "Request successful", data: students });
  } catch (err) {
    res.status(500).json({ error: { message: "cannot fetch students" } });
    console.error(err.message);
  }
};

// Get students by Id

export const getStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) {
      res.status(404).json({ error: { message: "student not found" } });
    }
    res
      .status(200)
      .json({ ok: true, message: "Request successful", data: student });
  } catch (err) {
    res.status(500).json({ error: { message: "cannot fetch student" } });
    console.error(err.message);
  }
};
