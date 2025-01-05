import React from "react";
import "./AboutBody.scss";
import dan from "./dan.png";
import ellen from "./ellen.png";

// Sample data for the authors
const authors = [
  { 
    name: "Dan Marlou Arevalo", 
    email: "dmarevalo00078@usep.edu.ph", 
    role: "BSCS - Student", 
    imgSrc: dan 
  },
  { 
    name: "Ellen Kaye Isip", 
    email: "ektisip01489@usep.edu.ph", 
    role: "BSCS - Student", 
    imgSrc: ellen 
  },
];

const AboutBody = () => {
  return (
    <div className="about-page">
      {/* Authors Section */}
      <section className="authors">
        <h2>Authors</h2>
        <div className="authors-container">
          {authors.map((author, index) => (
            <div className="author" key={index}>
              <img src={author.imgSrc} alt={author.name} />
              <h3>{author.name}</h3>
              <p className="email">{author.email}</p>
              <p className="role">{author.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Description Section */}
      <section className="description">
        <h3>Overview</h3>
        <p>
        The Smart Diabetes Screening Dashboard is an innovative dashboard designed
            to help in the early detection or screening of diabetes by using tongue images. Several
            studies have explored non-invasive approach for detecting diabetes, with findings 
            indicating a strong correlation between tongue image characteristics and diabetes status 
            (He et al., 2013, as cited in Zhang et al., 2017). This dashboard was designed to be used 
            by healthcare professionals to assist them in screening diabetes cases using tongue 
            images with the help of machine learning models. The dashboard provides medical 
            experts with an efficient, data-driven approach to diagnosing potential diabetes cases, 
            enhancing the accuracy and speed of screening while reducing the need for more 
            invasive diagnostic methods.
        </p>
      </section>

      {/* Process Section */}
      <section className="process">
        <h3>Process</h3>
        <p>
        The Smart Diabetes Screening Dashboard is an innovative tool designed to assist healthcare professionals in the early 
            detection of diabetes using tongue images. The core of the system is based on a pre-trained DenseNet-121 model, which has 
            been fine-tuned for diabetes detection. A secondary dataset of diabetic and non-diabetic tongue images was obtained from 
            Dalimuthe and Nurhusanah (2024). The images are resized to 224x224 pixels, matching the input size required by the 
            DenseNet-121 model, and then normalized using the standard ImageNet mean and standard deviation values. The model was
            trained through five (5) epochs and was able to achieve an accuracy of 94% on the evaluation. Once an image 
            is processed, the model predicts the likelihood of an individual being diabetic, producing a classification label 
            ("Diabetic" or "Non-Diabetic") and a confidence score indicating the reliability of the prediction. The confidence 
            score is calculated by applying the Softmax function to the raw model logits, converting them into probabilities for 
            each class. These results are then displayed on the dashboard for the healthcare professional to review.The dashboard 
            also includes several visualizations to provide deeper insights. Metric cards display the total number of 
            screenings, positive and negative cases, and the average confidence level across all predictions. A map visualizes the 
            geographic distribution of screenings, helping identify trends based on patient locations. Additionally, a line graph 
            tracks trends in diabetes cases over time, providing valuable temporal insights. Demographic data is also presented to 
            offer additional context for each screening, such as age, gender, or other relevant factors. This comprehensive and 
            user-friendly dashboard allows healthcare professionals to make more informed decisions, enhancing the accuracy, 
            efficiency, and accessibility of diabetes screening.
        </p>
      </section>

    {/* Limitation Section */}
      <section className="limitation">
        <h3>Limitation</h3>
        <p>
        The accuracy and generalizability of the model are influenced by the dataset used, which, although 
            carefully curated, may not fully represent diverse populations or real-world conditions. The dataset's limited size 
            and lack of demographic variation could affect the model's ability to perform consistently across different groups, 
            especially in terms of ethnicity and image quality. Additionally, the dashboard’s reliance on tongue images for screening 
            excludes other clinical factors that could contribute to a more comprehensive diagnosis. Also, the dataset that was used 
            for the training of the model is tongue images of people with Type 2 Diabtes. While the DenseNet-121 model has 
            been fine-tuned for diabetes detection, variations in image quality, lighting, and camera resolution may impact prediction
            accuracy. Furthermore, as a supplementary tool, the system should be used in conjunction with professional medical judgment, 
            and overreliance on its results could lead to misinterpretation or missed diagnoses. Healthcare professionals must also 
            consider the potential for overfitting, as the model's performance might degrade when applied to new or unseen data.
        </p>
      </section>

      {/* Dataset Section */}
      <section className="dataset">
        <h3>Dataset</h3>
        <p>
        The dataset used in the study is the publicly available Type 2 Diabetes Mellitus Tongue Dataset, contributed by 
            Muhammad Saddam Zikri Dalimuthe and Rossy Nurhusanah from Universitas Sumatera Utara. It is accessible via Mendeley Data. 
            The dataset consists of tongue images categorized into two groups: non-diabetic individuals and patients diagnosed with 
            Type 2 Diabetes Mellitus (T2DM). The images capture key features such as tongue texture, color, and coating, which are 
            known to exhibit differences between healthy individuals and those with diabetes. According to Dalimuthe and Nurhusanah (2024), 
            the tongue images were taken using a 48 MP smartphone camera, with each participant photographed five times to enhance dataset 
            variability. Consistent lighting conditions and standardized procedures were followed to minimize external influences. To 
            ensure accuracy, the diabetes status of participants was confirmed through medical records and blood tests, validating the 
            presence of diabetes in the diabetic group and the absence of the condition in the non-diabetic group.
        </p>
      </section>

      {/* References Section */}
      <section className="references">
        <h3>References</h3>
        <p>
        Cando, L. F. T., Quebral, E. P. B., Ong, E. P., Catral, C. D. M., Relador, R. J. L., Velasco, A. J. D., ... & Tantengco, O. A. G. (2024). Current status of diabetes mellitus care and management in the Philippines. Diabetes & Metabolic Syndrome: Clinical Research & Reviews, 102951.
        </p>
        <p>
        Dalimunthe, Muhammad Saddam Zikri; Nurhasanah, Rossy (2024), “Type 2 Diabetes Mellitus Tongue Dataset”, Mendeley Data, V2, doi: 10.17632/hyb44jf936.2
        </p>
        <p>
        Zhang, J., Xu, J., Hu, X., Chen, Q., Tu, L., Huang, J., & Cui, J. (2017). Diagnostic method of diabetes based on support vector machine and tongue images. BioMed research international, 2017(1), 7961494.
        </p>
      </section>

    </div>
  );
};

export default AboutBody;
