import Student from "../models/studentModel.js";

export const createStudent = async (req, res) => {
  const { name, email } = req.body;
  try {
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
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot create student" } });

    console.log(err.message);
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
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot fetch students" } });
    console.error(err.message);
  }
};

// Get students by Id

export const getStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res
        .status(404)
        .json({ ok: false, error: { message: "student not found" } });
    }
    res
      .status(200)
      .json({ ok: true, message: "Request successful", data: student });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot fetch student" } });
    console.error(err.message);
  }
};
