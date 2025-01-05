import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <AreaCard
        cardInfo={{
          title: "Total Screening",
          value: "10",
          text: "",
        }}
      />
      <AreaCard
        cardInfo={{
          title: "Total Diabetic Cases",
          value: "10",
          text: "10% of the Total Screening",
        }}
      />
      <AreaCard
        cardInfo={{
          title: "Total Non-Diabetic Cases",
          value: "100",
          text: "12% of the Total Screening",
        }}
      />
      <AreaCard
        cardInfo={{
          title: "Mean Confidence Level",
          value: "10%",
          text: "",
        }}
      />
    </section>
  );
};

export default AreaCards;
