import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Todolist from "./Todolist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="d-flex justify-content-center text-center">
			<div className="row mt-5 d-flex justify-content-center">
				<Todolist />
			</div>
		</div>
	);
};

export default Home;
