import {Button, Modal, Form} from "react-bootstrap";
import {useState, useEffect} from "react";
import "../css/ProfileTop.css";

function ModalExperience(props) {
	const url = `https://striveschool-api.herokuapp.com/api/profile/${props.profileId}/experiences`;

	const [data, setData] = useState({
		experience: {
			role: "",
			company: "",
			startDate: "",
			endDate: "",
			description: "",
			area: "",
		},
		dates: {
			sMonth: null,
			sYear: null,
			eMonth: null,
			eYear: null,
		},
	});
	const [state, setState] = useState(false);
	const [formData, setFormData] = useState(undefined);
	const [addLink, setAddLink] = useState(false);

	const updateChanges = (event) => {
		setState(event.target.checked);
	};

	useEffect(() => {
		let sYear = data.dates.sYear;
		let sMonth = data.dates.sMonth;
		let eYear = data.dates.eYear;
		let eMonth = data.dates.eMonth;
		let startDate =
			!isNaN(sYear) && !isNaN(sMonth) ? new Date(sYear, sMonth, 1) : null;
		let endDate =
			!isNaN(eYear) && !isNaN(eMonth) ? new Date(eYear, eMonth, 1) : null;
		if (startDate !== null) startDate = startDate.toISOString();
		if (endDate !== null) endDate = endDate.toISOString();
		if (startDate || endDate) {
			setData((data) => {
				return {
					...data,
					experience: {
						...data.experience,
						startDate: startDate,
						endDate: endDate,
					},
				};
			});
			sYear = null;
			sMonth = null;
			eYear = null;
			eMonth = null;
		}
	}, [data.dates]);

	useEffect(() => {
		if (props.open) {
			fillData();
		}
	}, [props]);

	const fillData = () => {
		let startDate = "";
		let endDate = "";
		let sYear = null;
		let sMonth = null;
		let eYear = null;
		let eMonth = null;
		Object.keys(data.experience).forEach((key) => {
			if (key === "startDate") {
				startDate = props.item[key];
				let date = new Date(startDate);
				sMonth = date.getMonth();
				sYear = date.getFullYear();
			}
			if (key === "endDate") {
				endDate = props.item[key];
				let date = new Date(endDate);
				eMonth = date.getMonth();
				eYear = date.getFullYear();
			}
			setData((data) => {
				return {
					...data,
					experience: {...data.experience, [key]: props.item[key]},
					dates: {sMonth: sMonth, eMonth: eMonth, sYear: sYear, eYear: eYear},
				};
			});
		});
	};

	const handleChange = (e) => {
		setData((data) => {
			return {
				...data,
				experience: {
					...data.experience,
					[e.target.id]: e.target.value,
				},
				dates: {...data.dates, [e.target.id]: e.target.value},
			};
		});
	};

	const handleChangeDates = (e) => {
		setData((data) => {
			return {
				...data,
				dates: {...data.dates, [e.target.id]: e.target.value},
			};
		});
	};

	const handleFileSaving = (e) => {
		e.preventDefault();
		const file = e.currentTarget.files[0];
		let form_data = new FormData();
		form_data.append("experience", file);
		setFormData((formData) => {
			return {
				form_data,
			};
		});
	};

	const handFileUpload = async (data) => {
		console.log(formData);
		try {
			if (formData !== undefined) {
				let newRes = await fetch(url + `/${data._id}/picture`, {
					method: "POST",
					headers: {
						Authorization: "Bearer " + props.bearerToken,
					},
					body: formData.form_data,
				});
				if (newRes.ok) {
					console.log("FileUploaded Experience");
				}
			}
		} catch (error) {
			console.log("fileUpload failed", error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(url + "/" + props.item._id, {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + props.bearerToken,
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				console.log("Experience Deleted");
				setData((data) => {
					return {
						experience: {
							role: "",
							company: "",
							startDate: "",
							endDate: "",
							description: "",
							area: "",
						},
						dates: {
							sMonth: "",
							sYear: null,
							eMonth: "",
							eYear: null,
						},
					};
				});
				props.onUpdate();
			} else {
				console.log("Something went wrong!");
			}
		} catch (error) {
			console.log(`Something went wrong! ${error}`);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		let method = "POST";
		let fetchUrl = url;
		if (props.item?._id) {
			method = "PUT";
			fetchUrl = url + "/" + props.item._id;
		}
		try {
			let response = await fetch(fetchUrl, {
				method: method,
				headers: new Headers({
					Authorization: "Bearer " + props.bearerToken,
					"Content-Type": "application/json",
				}),
				body: JSON.stringify(data.experience),
			});

			if (response.ok) {
				console.log("Experience Updated");
				const data = await response.json();
				await handFileUpload(data);
				setData((data) => {
					return {
						experience: {
							role: "",
							company: "",
							startDate: "",
							endDate: "",
							description: "",
							area: "",
						},
						dates: {
							sMonth: "",
							sYear: null,
							eMonth: "",
							eYear: null,
						},
					};
				});
				props.onUpdate();
			} else {
				console.log("Something went wrong!");
			}
		} catch (error) {
			console.log(`Something went wrong! ${error}`);
		}
	};

	return (
		<>
			<Modal
				size="lg"
				id="modalExperience"
				show={props.open}
				onHide={props.onShowModal}
				aria-labelledby="example-modal-sizes-title-lg"
				scrollable={true}
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						{props.item._id ? "Edit Experience" : "Add Experience"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="role" className="mb-3" required>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your title"
								value={data.experience.role}
								onChange={(e) => handleChange(e)}
							/>
						</Form.Group>

						<Form.Group controlId="employmentType" className="mb-3">
							<Form.Label>Employment Type</Form.Label>
							<Form.Control as="select">
								<option value="">-</option>
								<option>Full-time</option>
								<option>Part-time</option>
								<option>Self-employed</option>
								<option>Freelance</option>
								<option>Contract</option>
								<option>Internship</option>
								<option>Apprenticeship</option>
								<option>Temporary</option>
							</Form.Control>
							<Form.Group></Form.Group>
							<Form.Text className="text-muted">
								Country-specific employment types
								<br />
							</Form.Text>
							<Form.Text>
								<a href="/">Learn more</a>
							</Form.Text>
						</Form.Group>
						<Form.Group controlId="company" className="mb-3" required>
							<Form.Label>Company</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter company name you worked for"
								value={data.experience.company}
								onChange={(e) => handleChange(e)}
							/>
						</Form.Group>
						<Form.Group controlId="area" className="mb-3" required>
							<Form.Label>Location</Form.Label>
							<Form.Control
								type="text"
								placeholder="City, State, Country"
								value={data.experience.area}
								onChange={(e) => handleChange(e)}
							/>
						</Form.Group>

						<Form.Group controlId="currentRole" className="mb-2">
							<Form.Check
								type="checkbox"
								onChange={updateChanges}
								label="I am currently working in this role"
							/>
						</Form.Group>
						{state && (
							<>
								<Form.Group id="startDate" className="mb-2" required>
									<div className="d-flex justify-content-between w-50">
										<Form.Text>Start date *</Form.Text>
										<Form.Text>End date *</Form.Text>
									</div>
									<div className="d-flex justify-content-between">
										<div className="d-flex w-75">
											<div className="d-flex w-25 m-2">
												<Form.Control
													id="sMonth"
													as="select"
													value={data.dates.sMonth}
													onChange={(e) => handleChangeDates(e)}
												>
													<option value="">Month</option>
													<option value="0">January</option>
													<option value="1">February</option>
													<option value="2">March</option>
													<option value="3">April</option>
													<option value="4">May</option>
													<option value="5">June</option>
													<option value="6">July</option>
													<option value="7">August</option>
													<option value="8">September</option>
													<option value="9">October</option>
													<option value="10">November</option>
													<option value="11">December</option>
												</Form.Control>
											</div>
											<div className="d-flex w-25 m-2">
												<Form.Control
													id="sYear"
													as="select"
													value={data.dates.sYear}
													onChange={(e) => handleChangeDates(e)}
												>
													<option value="">Year</option>
													<option value="2021">2021</option>
													<option value="2020">2020</option>
													<option value="2019">2019</option>
													<option value="2018">2018</option>
													<option value="2017">2017</option>
													<option value="2016">2016</option>
													<option value="2015">2015</option>
													<option value="2014">2014</option>
													<option value="2013">2013</option>
													<option value="2012">2012</option>
													<option value="2011">2011</option>
													<option value="2010">2010</option>
													<option value="2009">2009</option>
													<option value="2008">2008</option>
													<option value="2007">2007</option>
													<option value="2006">2006</option>
													<option value="2005">2005</option>
													<option value="2004">2004</option>
													<option value="2003">2003</option>
													<option value="2002">2002</option>
													<option value="2001">2001</option>
													<option value="2000">2000</option>
													<option value="1999">1999</option>
													<option value="1998">1998</option>
													<option value="1997">1997</option>
													<option value="1996">1996</option>
													<option value="1995">1995</option>
													<option value="1994">1994</option>
													<option value="1993">1993</option>
													<option value="1992">1992</option>
													<option value="1991">1991</option>
													<option value="1990">1990</option>
													<option value="1989">1989</option>
													<option value="1988">1988</option>
													<option value="1987">1987</option>
													<option value="1986">1986</option>
													<option value="1985">1985</option>
													<option value="1984">1984</option>
													<option value="1983">1983</option>
													<option value="1982">1982</option>
													<option value="1981">1981</option>
													<option value="1980">1980</option>
													<option value="1979">1979</option>
													<option value="1978">1978</option>
													<option value="1977">1977</option>
													<option value="1976">1976</option>
													<option value="1975">1975</option>
													<option value="1974">1974</option>
													<option value="1973">1973</option>
													<option value="1972">1972</option>
													<option value="1971">1971</option>
													<option value="1970">1970</option>
													<option value="1969">1969</option>
													<option value="1968">1968</option>
													<option value="1967">1967</option>
													<option value="1966">1966</option>
													<option value="1965">1965</option>
													<option value="1964">1964</option>
													<option value="1963">1963</option>
													<option value="1962">1962</option>
												</Form.Control>
											</div>
											Present
										</div>
									</div>
								</Form.Group>
								<Form.Group controlId="updateMyIndustry" className="mb-2">
									<Form.Check type="checkbox" label="Update my Industry" />
								</Form.Group>
								<Form.Group controlId="updateMyHeadline" className="mb-3">
									<Form.Check type="checkbox" label="Update my Headline" />
								</Form.Group>
							</>
						)}
						{state === false && (
							<>
								<div className="d-flex w-100">
									<Form.Group id="startDate" className="mb-2" required>
										<div className="d-flex justify-content-between">
											<Form.Text>Start date *</Form.Text>
										</div>
										<div className="d-flex justify-content-between">
											<div className="d-flex">
												<div className="d-flex m-2">
													<Form.Control
														id="sMonth"
														as="select"
														value={data.dates.sMonth}
														onChange={(e) => handleChangeDates(e)}
													>
														<option value="">Month</option>
														<option value="0">January</option>
														<option value="1">February</option>
														<option value="2">March</option>
														<option value="3">April</option>
														<option value="4">May</option>
														<option value="5">June</option>
														<option value="6">July</option>
														<option value="7">August</option>
														<option value="8">September</option>
														<option value="9">October</option>
														<option value="10">November</option>
														<option value="11">December</option>
													</Form.Control>
												</div>
												<div className="d-flex m-2">
													<Form.Control
														id="sYear"
														as="select"
														value={data.dates.sYear}
														onChange={(e) => handleChangeDates(e)}
													>
														<option value="">Year</option>
														<option value="2021">2021</option>
														<option value="2020">2020</option>
														<option value="2019">2019</option>
														<option value="2018">2018</option>
														<option value="2017">2017</option>
														<option value="2016">2016</option>
														<option value="2015">2015</option>
														<option value="2014">2014</option>
														<option value="2013">2013</option>
														<option value="2012">2012</option>
														<option value="2011">2011</option>
														<option value="2010">2010</option>
														<option value="2009">2009</option>
														<option value="2008">2008</option>
														<option value="2007">2007</option>
														<option value="2006">2006</option>
														<option value="2005">2005</option>
														<option value="2004">2004</option>
														<option value="2003">2003</option>
														<option value="2002">2002</option>
														<option value="2001">2001</option>
														<option value="2000">2000</option>
														<option value="1999">1999</option>
														<option value="1998">1998</option>
														<option value="1997">1997</option>
														<option value="1996">1996</option>
														<option value="1995">1995</option>
														<option value="1994">1994</option>
														<option value="1993">1993</option>
														<option value="1992">1992</option>
														<option value="1991">1991</option>
														<option value="1990">1990</option>
														<option value="1989">1989</option>
														<option value="1988">1988</option>
														<option value="1987">1987</option>
														<option value="1986">1986</option>
														<option value="1985">1985</option>
														<option value="1984">1984</option>
														<option value="1983">1983</option>
														<option value="1982">1982</option>
														<option value="1981">1981</option>
														<option value="1980">1980</option>
														<option value="1979">1979</option>
														<option value="1978">1978</option>
														<option value="1977">1977</option>
														<option value="1976">1976</option>
														<option value="1975">1975</option>
														<option value="1974">1974</option>
														<option value="1973">1973</option>
														<option value="1972">1972</option>
														<option value="1971">1971</option>
														<option value="1970">1970</option>
														<option value="1969">1969</option>
														<option value="1968">1968</option>
														<option value="1967">1967</option>
														<option value="1966">1966</option>
														<option value="1965">1965</option>
														<option value="1964">1964</option>
														<option value="1963">1963</option>
														<option value="1962">1962</option>
													</Form.Control>
												</div>
											</div>
										</div>
									</Form.Group>
									<Form.Group id="endDate" className="mb-2" required>
										<div className="d-flex justify-content-between">
											<Form.Text>End date *</Form.Text>
										</div>
										<div className="d-flex justify-content-between">
											<div className="d-flex">
												<div className="d-flex m-2">
													<Form.Control
														id="eMonth"
														as="select"
														value={data.dates.eMonth}
														onChange={(e) => handleChangeDates(e)}
													>
														<option value="">Month</option>
														<option value="0">January</option>
														<option value="1">February</option>
														<option value="2">March</option>
														<option value="3">April</option>
														<option value="4">May</option>
														<option value="5">June</option>
														<option value="6">July</option>
														<option value="7">August</option>
														<option value="8">September</option>
														<option value="9">October</option>
														<option value="10">November</option>
														<option value="11">December</option>
													</Form.Control>
												</div>
												<div className="d-flex m-2">
													<Form.Control
														id="eYear"
														as="select"
														value={data.dates.eYear}
														onChange={(e) => handleChangeDates(e)}
													>
														<option value="">Year</option>
														<option value="2021">2021</option>
														<option value="2020">2020</option>
														<option value="2019">2019</option>
														<option value="2018">2018</option>
														<option value="2017">2017</option>
														<option value="2016">2016</option>
														<option value="2015">2015</option>
														<option value="2014">2014</option>
														<option value="2013">2013</option>
														<option value="2012">2012</option>
														<option value="2011">2011</option>
														<option value="2010">2010</option>
														<option value="2009">2009</option>
														<option value="2008">2008</option>
														<option value="2007">2007</option>
														<option value="2006">2006</option>
														<option value="2005">2005</option>
														<option value="2004">2004</option>
														<option value="2003">2003</option>
														<option value="2002">2002</option>
														<option value="2001">2001</option>
														<option value="2000">2000</option>
														<option value="1999">1999</option>
														<option value="1998">1998</option>
														<option value="1997">1997</option>
														<option value="1996">1996</option>
														<option value="1995">1995</option>
														<option value="1994">1994</option>
														<option value="1993">1993</option>
														<option value="1992">1992</option>
														<option value="1991">1991</option>
														<option value="1990">1990</option>
														<option value="1989">1989</option>
														<option value="1988">1988</option>
														<option value="1987">1987</option>
														<option value="1986">1986</option>
														<option value="1985">1985</option>
														<option value="1984">1984</option>
														<option value="1983">1983</option>
														<option value="1982">1982</option>
														<option value="1981">1981</option>
														<option value="1980">1980</option>
														<option value="1979">1979</option>
														<option value="1978">1978</option>
														<option value="1977">1977</option>
														<option value="1976">1976</option>
														<option value="1975">1975</option>
														<option value="1974">1974</option>
														<option value="1973">1973</option>
														<option value="1972">1972</option>
														<option value="1971">1971</option>
														<option value="1970">1970</option>
														<option value="1969">1969</option>
														<option value="1968">1968</option>
														<option value="1967">1967</option>
														<option value="1966">1966</option>
														<option value="1965">1965</option>
														<option value="1964">1964</option>
														<option value="1963">1963</option>
														<option value="1962">1962</option>
													</Form.Control>
												</div>
											</div>
										</div>
									</Form.Group>
								</div>
							</>
						)}

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={data.experience.description}
								onChange={(e) => handleChange(e)}
							/>
						</Form.Group>

						<div>
							<Form.Text className="text-muted">
								Media <br />
								Add or link to external documents, photes, sites, videos and
								presentation
							</Form.Text>
							<div className="mb-5">
								<div className="d-flex justify-content-between mt-3">
									<label className="w-50 m-1 rounded-pill btn btn-primary">
										<input
											style={{
												backgroundColor: "red",
												color: "white",
												opacity: "0",
												zIndex: "-1",
												position: "absolute",
											}}
											type="file"
											id="myfile"
											name="myfile"
											accept="image/jpeg, image/png"
											label="Update"
											onChange={handleFileSaving}
										/>
										<span>Upload</span>
									</label>
									<Button
										onClick={() => setAddLink(!addLink)}
										className="w-50 m-1 rounded-pill border border-primary "
										variant="light"
									>
										Link
									</Button>
								</div>

								<div className={addLink ? "d-block" : "d-none"}>
									<div className="input-group mb-3  ">
										<input
											type="text"
											className="form-control"
											placeholder="Post or type a link to a file or video"
										/>
										<div className="input-group-append">
											<button className="btn btn-primary" type="button">
												Add
											</button>
										</div>
									</div>
								</div>
								<p className="p-1">
									<span
										style={{
											color: "white",
											backgroundColor: "dodgerblue",
											fontSize: "10px",
											marginRight: "10px",
										}}
										className="badge badge-primary rounded-pill"
									>
										?
									</span>
									<a href="#help">Supported formats</a>
								</p>
							</div>
						</div>
						<div className="bg-light w-100">
							<div className="d-flex justif-content-between">
								<div className="d-flex justify-content-center align-items-center">
									<span>Off</span>
									<div className=" p-2">
										<label className="switch" label="Off">
											<input type="checkbox" />
											<span className="slider round"></span>
										</label>
									</div>
								</div>
								<div>
									<h5>Share with network</h5>
									<p>
										If enabled, your network may be informed of job chances,
										education chances and work anniversaries.{" "}
										<a href="/">Learn how these are shared and when</a>
									</p>
								</div>
							</div>
						</div>
						{props.item._id ? (
							<div className="d-flex justify-content-between mt-3 ">
								<Button
									className="rounded-pill border border-dark m-2"
									variant="light "
									type="submit"
									onClick={(e) => handleDelete(e)}
								>
									Delete
								</Button>
								<Button
									className="rounded-pill m-2"
									variant="primary"
									type="submit"
									onClick={(e) => handleUpdate(e)}
								>
									Save
								</Button>
							</div>
						) : (
							<div className="d-flex justify-content-end mt-3 ">
								<Button
									className="rounded-pill m-2"
									variant="primary"
									type="submit"
									onClick={(e) => handleUpdate(e)}
								>
									Save
								</Button>
							</div>
						)}
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ModalExperience;
