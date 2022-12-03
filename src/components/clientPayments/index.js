import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import * as moment from "moment";


const ClientPayments = () =>{
    const location = useLocation();
    let [userId, setUserId] = useState(null);
	let [pagamentosRealizados, setPagamentosRealizados] = useState([]);
    let [pagamentosPendentes, setPagamentosPendentes] = useState([]);
    let [userLogado, setUserLogado] = useState(null);
	let [userRequisitado, setUserRequisitado] = useState(null);
    let [uid, setUid] = useState(0);
	const { user } = useUserContext();

    useEffect(() => {
		if(!servico) {
        console.log(user);
        getUserByEmail(user.email)
		.then(res =>
			console.log(res));
    	}
	}, []);


    
    useEffect(() => {
        if (userId && !userRequisitado) {
            getUserById(userId);
        }
    }, [userId]);

	useEffect(() => {
        if (userLogado) {
            getRequisicoesByUserId(userId);
        }
    }, [userLogado]);


	const handleChangeStatus = (e) => {
        e.preventDefault();
        setStatusSelecionado(e.target.value);
    }

	const handleChangeAvaliacao = (e) => {
        e.preventDefault();
        setAvaliacaoSelecionada(e.target.value);
    }

    const getUserByEmail = async (userId) => {
		console.log("getUserByEmail " + userId);
        let url = "http://whm.joao1866.c41.integrator.host:9206/usuario?email=" + userId;
		try {
            const responseServices = await fetch(url);
            const jsonService = await responseServices.json();
			console.log(jsonService)
			setUserLogado(jsonService);
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
				setUserRequisitado(jsonService);
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
		console.log("handleSelect" + newIntervals);
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

	trataCategoria = (categoria) => {
	let categ = '';
	console.log("trataCategoria" + categoria);
    switch(categoria){
    case 'MANUTENCAO_ELETRICA' : return 'Manutenção Elétrica'
	case 'MANUTENCAO_HIDRAULICA' : return 'Manutenção Hidraulica'
	case 'DIARISTA' : return 'Diarista'
	case 'BABA' : return 'Babá'
	case 'BABA_POR_TURNO' : return 'Babá por turno'
	case 'PINTORA' : return 'Pintora'
	case 'COSTURA' : return 'Costura'
	case 'PEQUENOS_REPAROS' : return 'Pequenos Reparos'
	case 'HIGIENE_PESSOAL' : return 'Higiene Pessoal'
	default : return ''
    }

  }

		handleSave = () => {
			console.log("handleSave: " + this);
			let value = this.comentario?.value;
			let { start, end } = this.props;
			let formattedStart = start.format("DD-MM-YYYY HH:mm");
			let formatedEnd = end.format("DD-MM-YYYY HH:mm");
			let postData = value == 'CONCLUIDO' ? {
				solicitacao : 
					{id: this.props.serviceId},
				nota: avaliacaoSelecionada,
				comentario: value,
			} :
				{
					enderecoRequisitante: {
						id: this.props.userLogado?.enderecos.length > 0 ? enderecoSelecionado : userLogado.enderecos[0].id

					},
					userRequisitado:  {
						id: userId
					},
					inicio: formattedStart,
					fim: formatedEnd,
					categoria: servico,
					status: statusSelecionado ? statusSelecionado : 'AGENDADO'
				};
			if(this.props.serviceId)
				postData.id = this.props.serviceId;
            const options = {
                method: this.props.serviceId ? 'PUT' : 'POST',
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
					{
					/* tratamento para caso o usuário tenha mais de um endereço */
					(!this.props.serviceId && this.props.userLogado?.enderecos.length) > 0 &&
                            <select name={"selecione"} value={""} onChange={handleChangeEndereco}>
                                    { (this.props.userLogado.enderecos).map((endereco) =><>
                                        <option value={endereco.id}>{endereco.cidade} - {endereco.bairro} - {endereco.endereco}</option>
                                    </>)
                                    }
                                </select>
                                }
                    {
						/* tratamento para caso o usuário não tenha um endereço cadastradao */
                        this.props.userLogado?.enderecos.length == 0 && <Link to='/cadastro'>  <MenuText> Inserir Endereço </MenuText> </Link>
                    }
					
					<h2>
						{
						this.props.categoria ? this.trataCategoria(this.props.categoria) : ''	}
					</h2>
						{
							/* tratamento para solicitação prestada pelo usuário logado */
						(this.props.userRequisitado && this.props.userLogado && this.props.userRequisitado.id ==  this.props.userLogado.id)
							&&
										<select name={"selecione"} value={""} onChange={handleChangeStatus}>
											<option value="INICIADO">Iniciado</option>
											<option value="CANCELADO">Cancelado</option>
											<option value="CONCLUIDO">Concluído</option>
  										</select>
						}
						
						{ /* tratamento para solicitação do usuário logado e concluída */
							(this.props.value == 'CONCLUIDO' && this.props.userLogado?.id == this.props.userRequisitante.id) && <div>
							<label for="comentario">Comentário</label>
							<input type="text" id="comentario"/>
							</div>
					  	}

					{ /* tratamento para solicitação do usuário logado e concluída */
						(this.props.value == 'CONCLUIDO'  && this.props.userLogado?.id == this.props.userRequisitante.id) &&
						<select name={"selecione"} value={""} onChange={handleChangeAvaliacao}>
							<option value="1">Péssimo</option>
							<option value="2">Ruim</option>
							<option value="3">Razoável</option>
							<option value="4">Bom</option>
							<option value="5">Ótimo</option>
						  </select>
					  	}
					<button
						className="customModal__button customModal__button_float_right"
						onClick={this.handleSave}
					>
					{ this.props.serviceId > 0 ? 'Salvar' : 'Enviar Solicitação'}
					</button>
				</div>
			);
		}
	
    }
    return (
		<>
			{}
				<h3>Consulte os pagamentos para o usuário</h3>
		</>
	);
}

export default ClientPayments; 