import { Hotelcard } from "./HotelCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import StarRateIcon from "@material-ui/icons/StarRate";
import {
  FormControlLabel,
  makeStyles,
  Radio,
  Button,
  FormControl,
  RadioGroup,
} from "@material-ui/core";
import { useCallback } from "react";
import { SearchByProperty } from "./Filters/SearchByProperty";
import { PopularFilter } from "./Filters/PopularFilter";
import { GuestRating } from "./Filters/GuestRating";
import { PaymentType } from "./Filters/PaymentType";
import { PropertyType } from "./Filters/PropertyType";
import { PopularLocation } from "./Filters/PopularLocation";
import { Mealplans } from "./Filters/MealPlans";

const useStyle = makeStyles({
  button: {
    margin: "10px 10px 0 0",
    background: "white",
  },

  selected: {
    display: "flex",
    background: "#f0f3f5",
  },
});

const Wrapper = styled.div`
  width: 65%;
  margin: auto;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-gap: 1.5rem;

  .filter-title {
    font-size: 1rem;
    font-weight: 700;
    margin: 1.5rem 0;
  }

  .popular-filter {
    display: flex;
    flex-direction: column;
    color: #505c66;
  }
`;

export const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [data, setData] = useState([]);
  const classes = useStyle();
  const [priceFilter, setPriceFilter] = useState("");
  const handleChange = (event) => {
    const range = event.target.value.split(" ").map(Number);
    setPriceFilter(event.target.value);
    handlePriceFilter(range[0], range[1]);
  };

  const handlePriceFilter = (a, b) => {
    const newData = data.filter((item) => {
      return item.price >= a && item.price < b;
    });

    setHotels(newData);
  };

  const getData = () => {
    axios
      .get("http://localhost:3001/data")
      .then((res) => {
        setData(res.data);
        setHotels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleStar = useCallback(
    (star) => {
      const newData = data.filter((item) => {
        return item.starRating === star;
      });

      setHotels(newData);
    },
    [data]
  );

  return (
    <>
      <Wrapper>
        <div className="sorting">
          <SearchByProperty />

          {/* ---------------------------------------------------------------------------------------------------Star rating  */}
          <div className="filter-title">Star rating</div>
          <Button
            onClick={() => {
              handleStar(1);
            }}
            className={classes.button}
            variant="contained"
            color="default"
            endIcon={<StarRateIcon />}
          >
            1
          </Button>
          <Button
            onClick={() => {
              handleStar(2);
            }}
            className={classes.button}
            variant="contained"
            color="default"
            endIcon={<StarRateIcon />}
          >
            2
          </Button>
          <Button
            onClick={() => {
              handleStar(3);
            }}
            className={classes.button}
            variant="contained"
            color="default"
            endIcon={<StarRateIcon />}
          >
            3
          </Button>
          <Button
            onClick={() => {
              handleStar(4);
            }}
            className={classes.button}
            variant="contained"
            color="default"
            endIcon={<StarRateIcon />}
          >
            4
          </Button>
          <Button
            onClick={() => {
              handleStar(5);
            }}
            className={classes.button}
            variant="contained"
            color="default"
            endIcon={<StarRateIcon />}
          >
            5
          </Button>

          {/* ------------------------------------------------------------------------------------------------------- Your Budget rating  */}
          <div className="filter-title">Your Budget</div>
          <div className="popular-filter">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="guest-rating"
                name="guest-rating"
                value={priceFilter}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="0 75"
                  control={<Radio color="primary" />}
                  label="Less than 75$"
                />
                <FormControlLabel
                  value="75 125"
                  control={<Radio color="primary" />}
                  label="75$ to 125$"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="125 200"
                  control={<Radio color="primary" />}
                  label="125$ to 200$"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="200 300"
                  control={<Radio color="primary" />}
                  label="200$ to 300$"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="300 1000"
                  control={<Radio color="primary" />}
                  label="300$ and above"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <PopularFilter />
          <GuestRating />
          <PaymentType />
          <PropertyType />
          <PopularLocation />
          <Mealplans />
        </div>

        {/*------------------------------------------------------------------------------------------>>>>>> Hotel List  */}

        <div className="list">
          {hotels.map((item) => {
            return <Hotelcard key={item.hotelId} data={item} />;
          })}
        </div>
      </Wrapper>
    </>
  );
};