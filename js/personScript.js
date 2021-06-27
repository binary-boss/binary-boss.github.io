
const apiToken = "1f9148c0bfef466182c0de24aa6c6dbcf4dadcb5";
const companyDomain = "squadiq-sandbox";

function mapPersonResponse(myJson){
    const result = {
        id: myJson.data.id,
        firstName: myJson.data.first_name,
        lastName: myJson.data.last_name,
        name: myJson.data.name,
        email: myJson.data.email[0].value,
        phone: myJson.data.phone[0].value,
        org_name: myJson.data.org_name,
        org_id: myJson.data.org_id.value,
        won_deals_count: myJson.data.won_deals_count,
        lost_deals_count: myJson.data.lost_deals_count
    }
    return result;
}

const getPersonByID = async (personID) => {
    const response = await fetch('https://' + companyDomain + '.pipedrive.com/api/v1/persons/' + personID + '?api_token='+ apiToken);
    const myJson = await response.json(); //extract JSON from the http response
    const result = mapPersonResponse(myJson);
    document.getElementById("result").innerHTML = "<tr><td>Person ID: </td><td>"+result.id+"</td></tr><tr><td>Name: </td><td>"+result.name+"</td></tr><tr><td>Email: </td><td>"+result.email+"</td></tr><tr><td>Phone: </td><td>"+result.phone+"</td></tr><tr><td>Organisation Name: </td><td>"+result.org_name+"</td></tr><tr><td>Organisation ID: </td><td>"+result.org_id+"</td></tr><tr><td>Won Deals: </td><td>"+result.won_deals_count+"</td></tr><tr><td>Lost Deals: </td><td>"+result.lost_deals_count+"</td></tr>";
}

const serachPersonByName = async (term) => {
    const response = await fetch('https://' + companyDomain + '.pipedrive.com/api/v1/persons/search?term=' + term + '&api_token='+ apiToken);
    const myJson = await response.json(); //extract JSON from the http response
    const persons = myJson.data.items;
    for(let i=0; i<persons.length; i++){
        if (persons[i].item.type==="person"){
            let result = {    
                id: persons[i].item.id,
                name: persons[i].item.name,
                email: persons[i].item.emails[0],
                phone: persons[i].item.phones[0],
                org_name: persons[i].item.organization.name,
                org_id: persons[i].item.organization.id,
            }
            document.getElementById("result").innerHTML += "<tr><td>Person ID: </td><td>"+result.id+"</td></tr><tr><td>Name: </td><td>"+result.name+"</td></tr><tr><td>Email: </td><td>"+result.email+"</td></tr><tr><td>Phone: </td><td>"+result.phone+"</td></tr><tr><td>Organisation Name: </td><td>"+result.org_name+"</td></tr><tr><td>Organisation ID: </td><td>"+result.org_id+"</td></tr><br>";
        }
    }
}

const updatePersonByID = async (personID, personName, ownerID, orgID, emailID, phoneNo, visibleTo) => {
    const response = await fetch('https://' + companyDomain + '.pipedrive.com/api/v1/persons/' + personID + '?api_token='+ apiToken , { 
        method: 'PUT', 
        body: JSON.stringify({
            name: personName,
            owner_id: ownerID,
            org_id: orgID,
            email: [{"value": emailID,"primary":true, "label":"work"}],
            phone: [{"value": phoneNo,"primary":true, "label":"work"}],
            visible_to: visibleTo
        }), headers: {
        "Content-type": "application/json; charset=UTF-8"
    }});
    const myJson = await response.json();
    const result = mapPersonResponse(myJson);
    document.getElementById("result").innerHTML = "<tr><td>Person ID: </td><td>"+result.id+"</td></tr><tr><td>Name: </td><td>"+result.name+"</td></tr><tr><td>Email: </td><td>"+result.email+"</td></tr><tr><td>Phone: </td><td>"+result.phone+"</td></tr><tr><td>Organisation Name: </td><td>"+result.org_name+"</td></tr><tr><td>Organisation ID: </td><td>"+result.org_id+"</td></tr><tr><td>Won Deals: </td><td>"+result.won_deals_count+"</td></tr><tr><td>Lost Deals: </td><td>"+result.lost_deals_count+"</td></tr>";
}

const addNoteToPersonByID = async (personID, content) => {
    const response = await fetch('https://' + companyDomain + '.pipedrive.com/api/v1/notes' + '?api_token='+ apiToken , { 
        method: 'POST', 
        body: JSON.stringify({
            content: content,
            person_id: personID
        }), headers: {
        "Content-type": "application/json"
    }})
    //.then(response => response.json()).then(json => console.log(json));
    const myJson = await response.json();
    const result = {
        id: myJson.data.person_id,
        name: myJson.data.person.name,
        note: myJson.data.content,
        org_id: myJson.data.org_id,
        org_name: myJson.data.organization.name
    }
    document.getElementById("result").innerHTML = "<tr><td>Person ID: </td><td>"+result.id+"</td></tr><tr><td>Name: </td><td>"+result.name+"</td></tr><tr><td>Note: </td><td>"+result.note+"</td></tr><tr><td>Organisation Name: </td><td>"+result.org_name+"</td></tr><tr><td>Organisation ID: </td><td>"+result.org_id+"</td></tr>";
}

function submitGetPersonByIDForm(e){
  e.preventDefault();
  const personID =  document.getElementById("personID").value;
  getPersonByID(personID);
}

function submitSearchPersonByNameForm(e){
  e.preventDefault();
  const term =  document.getElementById("term").value;
  document.getElementById("result").innerHTML = " ";
  serachPersonByName(term);
}

function submitPersonUpdateForm(e){
  e.preventDefault();
  const personID =  document.getElementById("personID").value;
  const personName =  document.getElementById("personName").value;
  const ownerID =  document.getElementById("ownerID").value;
  const orgID =  document.getElementById("orgID").value;
  const emailID =  document.getElementById("emailID").value;
  const phoneNo =  document.getElementById("phoneNo").value;
  const visibleTo =  document.getElementById("visibleTo").value;
  updatePersonByID(personID, personName, ownerID, orgID, emailID, phoneNo, visibleTo);
}

function submitAddNoteToPersonForm(e){
  e.preventDefault();
  const personID =  document.getElementById("personID").value;
  const content =  document.getElementById("message").value;
  addNoteToPersonByID(personID, content);
}