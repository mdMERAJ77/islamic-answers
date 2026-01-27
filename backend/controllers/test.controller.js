// Why controller?
// Business logic stays here
// Routes remain clean
// Real-world practice

const testController = (req, res) => {
  res.json({
    success: true,
    message: "controller working fine",
  });
};

export default testController;
