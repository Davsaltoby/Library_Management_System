import Attendant from "../models/libraryAttendantModel.js";

// Create Library Attendant

export const createLibraryAttendant = async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res
      .status(400)
      .json({ error: { message: "This field is required" } });
  }

  try {
    const attendant = await Attendant.findOne({ name: name });

    if (attendant) {
      return res.status(409).json({
        error: {
          message: `Attendant: ${attendant.name}, already exists`,
        },
      });
    }

    const count = await Attendant.countDocuments();
    const staffIdGen = `STF-${String(count + 1).padStart(4, "0")}`;

    const newAttendant = await Attendant.create({ name, staffId: staffIdGen });

    res.status(201).json({
      ok: true,
      message: `Attendant created successfully`,
      data: newAttendant,
    });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot create attendant" } });

    console.log(err.message);
  }
};

// Get Library Attendants

export const getLibraryAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find().sort({ name: 1 });

    res.status(200).json({
      ok: true,
      message: "Attendants request successful",
      data: attendants,
    });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot get attendants" } });

    console.log(err.message);
  }
};
