import React, { useState, useEffect } from "react";
import {DivCapsule,MenuText} from './style';
import { Link } from 'react-router-dom';
import WeekCalendar from "react-week-calendar";
import { useLocation } from "react-router-dom";
import { auth } from "../../context/firebase";
import * as moment from "moment";


const ClientPage = () =>{
    const location = useLocation();
    let [userId, setUserId] = useState(null);
	let [user, setUser] = useState(null);
    let [selecionado, setSelecionado] = useState([]);
    let [servico, setServico] = useState(null);
    let [userRequisitante, setUserRequisitante] = useState(null);
    let [uid, setUid] = useState(0);

    useEffect(() => {
        console.log(auth._currentUser.uid);
        const queryParams = new URLSearchParams(location.search);
        console.log(queryParams);
        const userId = queryParams.get("id");
        const servicoId = queryParams.get("servico");
        setUserId(userId);
        setServico(servicoId);
        getUserByEmail(auth._currentUser.email);
    }, []);


    
    useEffect(() => {
        if (userId && user == null) {
            getUserById(userId);
            getRequisicoesByUserId(userId);
        }
    }, [user, userId]);

    const handleChange = (value) => {
        console.log(value);
        setSelecionado(value);
    }

    const getUserByEmail = async (userId) => {
		console.log("getUserByEmail " + userId);
        let url = "http://whm.joao1866.c41.integrator.host:9206/usuario?email=" + userId;
		try {
            const responseServices = await fetch(url);
            const jsonService = await responseServices.json();
				setUserRequisitante(jsonService);
            } catch (error) {
                console.error(error);
              }
	};

    const getUserById = async (userId) => {
		console.log("getUserById " + userId);
        let url = "http://whm.joao1866.c41.integrator.host:9206/usuario?id=" + userId;
        try {
            const responseServices = await fetch(url);
            const jsonService = await responseServices.json();
				setUser(jsonService);
            } catch (error) {
                console.error(error);
              }
	};

	const getRequisicoesByUserId = async (userId) => {
        console.log("getRequisicoesByUserId " + userId);
        let url = "http://whm.joao1866.c41.integrator.host:9206/solicitacao?userRequisitadoId=" + userId;
        try {
            const responseServices = await fetch(url);
            const jsonService = await responseServices.json();
			console.log(jsonService)
			parseService(jsonService);
            } catch (error) {
                console.error(error);
              }
	};

	const parseService = (requisicoes = []) => {
		console.log("parseRequisicoes");
		console.log(selecionado);
		let lastUid = 0;
		let parseRequisicoes = [];
		requisicoes.forEach((service) => {
			console.log(service);
			let includeService = {
				lastUid: lastUid,
				start: moment(service.inicio,"DD/MM/YYYY hh:mm"),
				end: moment(service.fim,"DD/MM/YYYY hh:mm"),
				value: "XXXX",
			};
			console.log(includeService);
			lastUid++;
			parseRequisicoes.push(includeService);
		});
		setUid(lastUid);
		setSelecionado(parseRequisicoes);
	};

	const handleEventRemove = (event) => {
		const { selectedIntervals } = this.state;
		console.log("handleEventRemove: " + selectedIntervals)
		const index = selectedIntervals.findIndex(
			(interval) => interval.uid === event.uid
		);
		if (index > -1) {
			selectedIntervals.splice(index, 1);
			this.setState({ selectedIntervals });
		}
	};

	const handleSelect = (newIntervals) => {
		console.log(newIntervals);
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

	const handleEventUpdate = (event) => {
		const { selectedIntervals } = this.state;
		console.log("handleEventUpdate: " + selectedIntervals)
		const index = selectedIntervals.findIndex(
			(interval) => interval.uid === event.uid
		);
		if (index > -1) {
			selectedIntervals[index] = event;
			this.setState({ selectedIntervals });
		}
	};


	class ModalCalendar extends React.Component {

		constructor(props) {
			super(props);
			console.log("StandardCalendar: " + props);
			this.state = {
				lastUid: uid,
				selectedIntervals: selecionado,
			};
		}

		handleSave = () => {
			console.log("handleSave: " + this);
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
                status: 'AGENDADO'
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
					let requisicoesAtuais = selecionado;
					requisicoesAtuais.push(data);
				})
				.catch((error) => {
					console.error("error", error);
				});
		};


        render() {
			const { value, start, end } = this.props;

			return (
				<div className="customModal">
					<div className="customModal__text">
						{`Das ${start.format("HH:mm")} as ${end.format("HH:mm")}`}
					</div>
					{ userRequisitante.enderecos.length > 0 &&
                            <select name={"selecione"} value={""} onChange={handleChange}>
                                    { (userRequisitante.enderecos).map((endereco) =><>
                                        <option value={endereco.id}>{endereco.cidade} - {endereco.bairro} - {endereco.endereco}</option>
                                    </>)
                                    }
                                </select>
                                }
                    {
                        userRequisitante.enderecos.length == 0 && <Link to='/cadastro'>  <MenuText> Inserir Endereço </MenuText> </Link>
                    }
                    <input ref={(el) => {
							this.input = el;
						}}
                        type="hidden"  value={userRequisitante.nome}/>
					<button
						className="customModal__button customModal__button_float_right"
						onClick={this.handleSave}
					>
						Enviar Solicitação
					</button>
				</div>
			);
		}
	
    }
    return (
		<>
			{}
				<h3>Consulte os horários disponível para o usuário</h3>
                <DivCapsule>
                    <WeekCalendar
						numberOfDays={7}
						dayFormat={"DD/MM"}
						scaleUnit={60}
						scaleFormat={"HH"}
						selectedIntervals={selecionado}
						onIntervalSelect={handleSelect}
						onIntervalUpdate={handleEventUpdate}
						onIntervalRemove={handleEventRemove}
						modalComponent={ModalCalendar}
					></WeekCalendar>
                    </DivCapsule>
		</>
	);
}

export default ClientPage; 