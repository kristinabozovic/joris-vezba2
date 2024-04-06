async function ucitajHotele(){
    const hotelSelect=document.getElementById('hoteli');

    const response=await fetch('https://joris.testmaster.fon.bg.ac.rs/api/hoteli');
    const hoteli=await response.json();

    for(let i=0;i<hoteli.length;i++){
        const hotel=hoteli[i];

        hotelSelect.options.add(new Option(hotel.naziv,hotel.id));
    }
}
ucitajHotele();


async function ucitajSobe(){
    const hotelSelect=document.getElementById('hoteli');
    console.log(hotelSelect.value);
    const sobeSelect=document.getElementById('sobe');

    if(!hotelSelect.value){
        sobeSelect.innerHTML='';
        return;
    }

    const response=await fetch('https://joris.testmaster.fon.bg.ac.rs/api/hoteli/' +hotelSelect.value);
    const detaljiHotela=await response.json();
    
    console.log(detaljiHotela);

    sobeSelect.innerHTML='';

    detaljiHotela.forEach(soba=>{
        sobeSelect.options.add(new Option(soba.naziv,soba.id));
    });
}

async function cekajHotel(){
 const hoteliSelect=document.getElementById('hoteli');
 hoteliSelect.addEventListener('change', ucitajSobe);
}
cekajHotel();


async function rezervisi(e){
    e.preventDefault();

    const tabela=document.getElementById('tabela');
    const poruka=document.getElementById('poruka');
    const hotelId=document.getElementById('hoteli').value;
    const sobaId=document.getElementById('sobe').value;
    const datumOd=document.getElementById('datumod').value;
    const datumDo=document.getElementById('datumdo').value;
    const dorucak=document.getElementById('dorucak').checked;
    const rucak=document.getElementById('rucak').checked;
    const vecera=document.getElementById('vecera').checked;
    const napomena=document.getElementById('napomena').value;

    if(!isNaN(hotelId) && !isNaN(sobaId) && datumOd!=null && datumDo!=null){
       if(Date.parse(datumOd)<Date.parse(datumDo)){
        poruka.innerHTML='';
        const rezervacija={
            hotelId: hotelId,
            sobaiD: sobaId,
            datumOd:datumOd,
            datumDo:datumDo,
            dorucak:dorucak,
            rucak:rucak,
            vecera:vecera,
            napomena:napomena
        }
        const rezervacijaJson=JSON.stringify(rezervacija);
        console.log(rezervacijaJson);
       }
    }
    else{
        poruka.innerHTML="Obavezna polja nisu popunjena";
        console.log("Obavezna polja nisu popunjena");
    }
}

const dugmeRezervisi=document.getElementById('rezervisi');
dugmeRezervisi.addEventListener('click',rezervisi);















