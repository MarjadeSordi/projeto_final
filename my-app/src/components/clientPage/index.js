import React, { useState, useEffect } from "react";
import {ImgFirstPageStyle,Container, CalendarContainer } from './style';
import WeekCalendar from "react-week-calendar";
import { useLocation } from "react-router-dom";
import { auth } from "../../context/firebase";
import * as moment from "moment";


const ClientPage = () =>{
    const location = useLocation();
    let [userId, setUserId] = useState(null);
	let [user, setUser] = useState(null);
    let [servico, setServico] = useState(null);
    let [userRequisitante, setUserRequisitante] = useState(null);
	let [requisicoes, setRequisicoes] = useState([]);
    let [enderecos, setEnderecos] = useState([]);
    let [uid, setUid] = useState(0);

    useEffect(() => {
        console.log(auth);
        console.log(auth._currentUser);
        const queryParams = new URLSearchParams(location.search);
        console.log(queryParams);
        const userId = queryParams.get("id");
        const servicoId = queryParams.get("servico");
        setUserId(userId);
        setServico(servicoId);
        getUserByUid(auth._currentUser.toJSON().uuid);
    }, []);


    
    useEffect(() => {
        if (userId) {
            getUserById(userId);
            getRequisicoesByUserId(userId);
        }
    }, [user, userId]);

    const getUserByUid = (userId) => {
		console.log("getUserByUid " + userId);
		fetch("http://whm.joao1866.c41.integrator.host:9206/usuario?userId=" + userId,{ mode: 'no-cors'})
			.then(({ data }) => {
				setUserRequisitante(data);
				console.log(data);
			})
			.catch((error) => {
				console.error("error", error);
			});
	};

    const getUserById = (userId) => {
		console.log("getUserById " + userId);
		fetch("http://whm.joao1866.c41.integrator.host:9206/usuario?id=" + userId,{ mode: 'no-cors'})
			.then(({ data }) => {
				setUser(data);
				console.log(data);
			})
			.catch((error) => {
				console.error("error", error);
			});
	};

	const getRequisicoesByUserId = (userId) => {
		fetch("http://whm.joao1866.c41.integrator.host:9206/solicitacao?userRequisitadoId=" + userId,{ mode: 'no-cors'})
			.then((res) => {
				console.log("getRequisicoesByUserId " + userId);
				parseService(res);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const parseService = (requisicoes = []) => {
		console.log("parseRequisicoes");
		console.log(requisicoes);
		let parseRequisicoes = [];
		requisicoes.forEach((service) => {
			let includeService = {
				lastUid: service.id,
				start: moment(service.inicio),
				end: moment(service.fim),
				value: "XXXX",
			};
			parseRequisicoes.push(includeService);
		});
		setRequisicoes(parseRequisicoes);
	};

	class StandardCalendar extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				lastUid: userRequisitante.id,
				selectedIntervals: requisicoes,
			};
		}

		handleEventRemove = (event) => {
			const { selectedIntervals } = this.state;
			const index = selectedIntervals.findIndex(
				(interval) => interval.uid === event.uid
			);
			if (index > -1) {
				selectedIntervals.splice(index, 1);
				this.setState({ selectedIntervals });
			}
		};

		handleEventUpdate = (event) => {
			const { selectedIntervals } = this.state;
			const index = selectedIntervals.findIndex(
				(interval) => interval.uid === event.uid
			);
			if (index > -1) {
				selectedIntervals[index] = event;
				this.setState({ selectedIntervals });
			}
		};

		handleSelect = (newIntervals) => {
			const { lastUid, selectedIntervals } = this.state;
			const intervals = newIntervals.map((interval, index) => {
				return {
					...interval,
					uid: lastUid + index,
				};
			});

			this.setState({
				selectedIntervals: selectedIntervals.concat(intervals),
				lastUid: lastUid + newIntervals.length,
			});
		};

		render() {
			return (
				<WeekCalendar
					numberOfDays={7}
					dayFormat={"DD/MM"}
					scaleUnit={60}
					scaleFormat={"HH"}
					modalComponent={ModalCalendar}
					selectedIntervals={this.state.selectedIntervals}
					onIntervalSelect={this.handleSelect}
					onIntervalUpdate={this.handleEventUpdate}
					onIntervalRemove={this.handleEventRemove}
				/>
			);
		}
	}

	class ModalCalendar extends React.Component {
		handleSave = () => {
			console.log(this);
			let { value } = this.input;
			let { start, end } = this.props;
			let formattedStart = start.format("DD-MM-YYYY HH:mm");
			let formatedEnd = end.format("DD-MM-YYYY HH:mm");
			let postData = {
				enderecoRequisitante: {
                    id: userRequisitante.enderecos[0].id
                },
				userRequisitado:  {
                    id: user.id
                },
				inicio: formattedStart,
				fim: formatedEnd,
				categoria: servico,
			};
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
                }
			console.log("post", postData);
			fetch("http://whm.joao1866.c41.integrator.host:9206/solicitacao", options)
				.then(({ data }) => {
					console.log(data);
				})
				.catch((error) => {
					console.error("error", error);
				});
		};
    }
    return (
		<>
			{}
			<Container>
				{}
				<h3>Consulte os horários disponível para o usuário</h3>
				<CalendarContainer>
					<WeekCalendar
						numberOfDays={7}
						dayFormat={"DD/MM"}
						scaleUnit={60}
						scaleFormat={"HH"}
						selectedIntervals={requisicoes}
						modalComponent={ModalCalendar}
					></WeekCalendar>
				</CalendarContainer>
			</Container>
		</>
	);
}

export default ClientPage; 