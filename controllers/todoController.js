const axios = require('axios');

exports.fetchAndSaveTodo = async (req, res) => {
  try {
    // simple placeholder: fetch a todo from JSONPlaceholder and return it
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return res.json({ success: true, data: response.data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
