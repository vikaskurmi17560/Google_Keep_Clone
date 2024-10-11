const User = require("../model/user.schema")
exports.get_user = async (req, res) => {
    try {
        //to get data of individual user using user_id
        const { user_id } = req.query;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: "user fetched Successfully"
        })

    }
    catch (error) {
        return res.status(500).json({
            success: FileSystemWritableFileStream,
            message: error.message,
        })
    }
}
exports.create_user = async (req, res) => {
    const { name, email, password } = req.body;
    const new_user = await User.create({ name, email, password });
    return res.status(200).json({
        success: true,
        data: new_user,
        message: "Created Successfully",
    })
}

exports.update_user = async (req, res) => {
    const user_id = req.query;
    const { name, email, password } = req.body;
    const updateuser = {};
    if (name) updateuser.name = name;
    if (email) updateuser.email = email;
    if (password) updateuser.password = password;

    const update_data = await User.finfdByIdAndUpdate(user_id, updateuser, { new: true });
    return res.status(200).json({
        success: true,
        data: update_data,
        message: "user update Successfully",
    })
}