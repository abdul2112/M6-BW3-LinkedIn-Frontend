// import { Container, Col, Row } from "react-bootstrap"
import { DropdownButton, Dropdown, Col, Row } from 'react-bootstrap';
import { HelpCircle } from 'react-ionicons';
import { Flower } from 'react-ionicons';
import '../css/Footer.css';
import liLogo from '../assets/img/Linkedin-Logo.png';
const Footer = () => {
	return (
		<Row>
			<Col>
				<footer id="footer">
					<img src={liLogo} alt="LinkedIn logo" width="100rem" />
					<Row>
						<div className="col-md-2">
							<nav>
								<li className="py-1">
									<a className="text-muted" href="/">
										About
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Community Guidelines
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Privacy and Terms
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Sales Solutions
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Safety Center
									</a>
								</li>
							</nav>
						</div>
						<Col className="col-md-2">
							<nav>
								<li className="py-1">
									<a className="text-muted" href="/">
										Accessibility
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Careers
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Ad choices
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Mobile
									</a>
								</li>
							</nav>
						</Col>
						<Col className="col-md-2">
							<nav>
								<li className="py-1">
									<a className="text-muted" href="/">
										Talent Solutions
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Marketing Solutions
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Advertising
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Small Business
									</a>
								</li>
							</nav>
						</Col>
						<Col className="col-md-2">
							<nav>
								<li className="py-1">
									<a className="text-muted" href="/">
										Gift Cards
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Terms Of Use
									</a>
								</li>
								<li className="py-1">
									<a className="text-muted" href="/">
										Corporate Information
									</a>
								</li>
							</nav>
						</Col>
						<Col className="col-md-2">
							<ul>
								<li className="display-flex mb-2">
									<HelpCircle
										color={'#4e4e4e'}
										title={'help'}
										height="25px"
										width="25px"
									/>
									<span>
										<a className="text-muted" href="/">
											Questions?
										</a>
										<p className="text-muted text">Visit our help center.</p>
									</span>
								</li>
								<li className="display-flex list-style-none mb-4">
									<Flower
										color={'#4e4e4e'}
										title={'help'}
										height="25px"
										width="25px"
									/>

									<a className="text-muted" href="/">
										Manage your account and privacy
									</a>
									<p className="text-muted text">Go to your settings.</p>
								</li>
							</ul>
						</Col>
						<Col className="col-md-2">
							<label className="text-muted">Select language</label>
							<DropdownButton
								drop="down"
								variant="outline-secondary"
								title={` Language `}
							>
								<Dropdown.Item>
									<p className="dropdownText">العربية (Arabic)</p>
								</Dropdown.Item>
								<Dropdown.Item>
									<p className="dropdownText">日本人 (Japanese)</p>
								</Dropdown.Item>
								<Dropdown.Item>
									<p className="dropdownText">Español (Spanish)</p>
								</Dropdown.Item>
							</DropdownButton>
						</Col>
					</Row>
					<div>
						<p className="text-muted copyright">LinkedIn Corporation © 2021</p>
					</div>
				</footer>
			</Col>
		</Row>
	);
};

export default Footer;
