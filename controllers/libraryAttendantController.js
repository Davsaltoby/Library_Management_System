import Attendant from "../models/libraryAttendantModel.js";

// Create Library Attendant

export const createLibraryAttendant = async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res
      .status(400)
      .json({ error: { messsage: "This field is required" } });
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
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Library Attendants

export const getLibraryAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find().sort({ name: 1 });

    res.status(200).json({
      okay: true,
      message: "Attendants request successful",
      data: attendants,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
