import React, { useState, useEffect } from 'react';
import { DivCapsule, Input, Label, MenuText, Small, TitleCalendar } from './style';
import { Link } from 'react-router-dom';
import WeekCalendar from 'react-week-calendar';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import * as moment from 'moment';
import MenuPage from '../menu';
import { ButtonModal } from '../providerDetails/style';


const ClientPage =  (props)  => {
	const {data } = props 
	const location = useLocation();
	let [userId, setUserId] = useState(null);
	let [selecionado, setSelecionado] = useState([]);
	let [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
	let [statusSelecionado, setStatusSelecionado] = useState(null);
	let [servico, setServico] = useState(null);
	let [userLogado, setUserLogado] = useState(null);
	let [userRequisitado, setUserRequisitado] = useState(null);
	let [uid, setUid] = useState(0);
	const { user } = useUserContext();
	console.log('aqui', user);
	

	const urlParams = window.location.href;
	const urlSplit = urlParams.split('/servico/');
	const urlSplitForId = urlParams.split('/requisicao/');
	const findId = (urlSplitForId[urlSplitForId.length - 1]).substring(0, 2);
	const findService = urlSplit[urlSplit.length - 1];

	const timeElapsed = Date.now();
	const today = new Date(timeElapsed);

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2)
			month = '0' + month;
		if (day.length < 2)
			day = '0' + day;

		return [year, month, day].join('-');
	}

	useEffect(() => {
		if (user) {
			getUserByEmail(user.email);
		} else (console.log('error'));

	}, [user]);



	const handleChangeEndereco = (e) => {
		e.preventDefault();
		setEnderecoSelecionado(e.target.value);
	}
	console.error(enderecoSelecionado, 'aaaa')

	const handleChangeStatus = (e) => {
		e.preventDefault();
		setStatusSelecionado(e.target.value);
	}

	const getUserByEmail = async (userEmail) => {
		console.log(getUserByEmail + userId);
		let url = `http://whm.joao1866.c41.integrator.host:9206/usuario?email=${userEmail}`
		try {
			const responseServices = await fetch(url);
			const jsonService = await responseServices.json();
			console.log(jsonService)
			setUserLogado(jsonService);
		} catch (error) {
			console.error(error);
		}
	};


	/*const handleEventRemove = (event) => {
		const { selectedIntervals } = this.state;
		console.log(handleEventRemove:  + selectedIntervals)
		const index = selectedIntervals.findIndex(
			(interval) => interval.uid === event.uid
		);
		if (index > -1) {
			selectedIntervals.splice(index, 1);
			this.setState({ selectedIntervals });
		}
	};*/

	const handleSelect = (newIntervals) => {
		console.log(handleSelect + newIntervals);
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
		const index = selectedIntervals.findIndex(
			(interval) => interval.uid === event.uid
		);
		if (index > -1) {
			selectedIntervals[index] = event;
			this.setState({ selectedIntervals });
		}
	};


	let categ = ''
	const TrataCategoria = (categoria) => {
		switch (categoria) {
			case 'MANUTENCAO_ELETRICA':
				categ = 'Manutenção elétrica'
				break
			case 'MANUTENCAO_HIDRAULICA':
				categ = 'Manutenção hidraúlica'
				break
			case 'DIARISTA':
				categ = 'Diarista'
				break
			case 'BABA':
				categ = 'Babá'
				break
			case 'BABA_POR_TURNO':
				categ = 'Babá por turno'
				break
			case 'PINTORA':
				categ = 'Pintora'
				break
			case 'PEQUENOS_REPAROS':
				categ = 'Pequenos reparos'
				break
			case 'COSTURA':
				categ = 'Costura'
				break
			case 'HIGIENE_PESSOAL':
				categ = 'Higiene Pessoal'
				break
			default: categ = '';
		}
	}






	function handleSave () {			
	 const bodyRequest = {
			enderecoRequisitante: {
				id: 3
			},
			userRequisitado: {
				id: Number(findId)
			},
			inicio: '20-12-2022 14:00',
			fim: '20-12-2022 15:00',
			categoria: findService,
			status: 'AGENDADO'
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyRequest),
		}
		fetch('http://whm.joao1866.c41.integrator.host:9206/solicitacao', options)
			.then(({ data }) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error, error);
			});
	};



console.error(today)

return (
<>

	<DivCapsule>
		<MenuPage />
		<TitleCalendar>Consulte os horários disponível para o usuário </TitleCalendar>
		<Label for='data'> Escolha uma data: </Label>
		<Input id="date" type="date" min={formatDate(today)} />
		<Label for="entrada">Escolha o horário para receber a prestadora :</Label>

		<Input type="time" id="entrada" name="entrada"
			min="09:00" max="18:00" required />

		<Small>Horário permitido das 09h às 18h</Small>

		<Label for="saida"> Selecione o horário de saída da prestadora :</Label>

		<Input type="time" id="appt" name="appt"
			min="09:00" max="19:00" required />

		<Small>Horário permitido das 10h às 20h</Small>

		<ButtonModal> Consultar disponibilidade </ButtonModal>


	</DivCapsule>
</>
);
}

export default ClientPage;

