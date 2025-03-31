import { Report } from "notiflix/build/notiflix-report-aio";

export const report = ({ type, title, message, confirm }) => {
  if (type == "failure")
    Report.failure(title, message, confirm, {
      failure: {
        backOverlayColor: "#21669e1f",
      },
      svgSize: "35px",
      messageMaxLength: 1000,
      plainText: false,
    });
  if (type == "success")
    Report.success(title, message, confirm, {
      success: {
        svgColor: "#21669e",
        buttonBackground: "#21669e",
        backOverlayColor: "#21669e1f",
      },
      svgSize: "35px",
      messageMaxLength: 1923,
      plainText: false,
      backgroundColor: "white",
    });
};
