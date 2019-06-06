# importing the requests library 
import requests 

print("DEMARAGE INIT DATA")

# Definition de la base des endpoints de l'API  
API_ENDPOINT = "http://127.0.0.1:3030/v1/api"


# Creation d'un compte admin pour le script
ADMIN = {
  "role": "ADMIN_USER",
  "email": "admin@admin.fr",
  "firstName": "Administrateur",
  "lastName": "AD",
  "key": "",
  "password": "password"
}

r = requests.post(url = (API_ENDPOINT + '/auth/register'), data = ADMIN)
print("REGISTER ADMIN: \n %s \n"%r.text)

# Login du compte admin et sauvegarde de son token jwt
AUTH_ADMIN = {
  "email": "admin@admin.fr",
  "password": "password"
}

r = requests.post(url = (API_ENDPOINT + '/auth/login'), data = AUTH_ADMIN)
print("LOGIN: \n %s \n"%r)
jsonR = r.json()
AUTH_TOKEN = jsonR['token']
print("TOKEN ADMIN : \n %s \n"%AUTH_TOKEN)

# Parametrage du header d'auth
hed = {'Authorization': 'Bearer ' + AUTH_TOKEN}


# Insertion de 4 Users
USER1 = {
  "role": "TEACHER",
  "email": "florian@blot.fr",
  "firstName": "Florian",
  "lastName": "BLOT",
  "key": "189192507531",
  "password": "password"
}

USER2 = {
  "role": "STUDENT",
  "email": "evan@martho.fr",
  "firstName": "Evan",
  "lastName": "Martho",
  "key": "18924025123791",
  "password": "password"
}

USER3 = {
  "role": "STUDENT",
  "email": "jeanalexandre@gautreau.fr",
  "firstName": "Jean-Alexandre",
  "lastName": "GAUTREAU",
  "key": "125307650",
  "password": "password"
}

USER4 = {
  "role": "STUDENT",
  "email": "foo@bar.fr",
  "firstName": "foo",
  "lastName": "bar",
  "key": "",
  "password": "password"
}

r = requests.post(url = (API_ENDPOINT + '/user'), data = USER1, headers=hed)
print("INSERTION USER1 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/user'), data = USER2, headers=hed)
print("INSERTION USER2 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/user'), data = USER3, headers=hed)
print("INSERTION USER3 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/user'), data = USER4, headers=hed)
print("INSERTION USER4 :\n %s \n"%r.text)

# Insertion de 4 Classrooms
CLASSROOM1 = {
  "name": "RZ 014",
  "batiment": "RIZOMM",
  "adresse": "41 Rue du port"
}

CLASSROOM2 = {
  "name": "RZ 209 B Ac'lab",
  "batiment": "RIZOMM",
  "adresse": "41 Rue du port"
}

CLASSROOM3 = {
  "name": "RZ 408",
  "batiment": "RIZOMM",
  "adresse": "41 Rue du port"
}

CLASSROOM4 = {
  "name": "FV 022 Amphi Choteau",
  "batiment": "Faculte de Medecine",
  "adresse": "41 Rue du port"
}

r = requests.post(url = (API_ENDPOINT + '/classroom'), data = CLASSROOM1, headers=hed)
print("INSERTION CLASSROOM1 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/classroom'), data = CLASSROOM2, headers=hed)
print("INSERTION CLASSROOM2 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/classroom'), data = CLASSROOM3, headers=hed)
print("INSERTION CLASSROOM3 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/classroom'), data = CLASSROOM4, headers=hed)
print("INSERTION CLASSROOM4 :\n %s \n"%r.text)


# Recuperation de l'id de la premiere classroom et insertion d'un raspberry associe
r = requests.get(url = (API_ENDPOINT + '/classroom'), headers=hed)
classrooms = r.json()
idClassroom = classrooms[0]['id']

RASPBERRY = {
  "uid": "RASP_DEMO_1",
  "idClassroom": idClassroom
}

r = requests.post(url = (API_ENDPOINT + '/raspberry'), data = RASPBERRY, headers=hed)
print("INSERTION RASPBERRY :\n %s \n"%r.text)


# Insertion d'une promo
PROMO = {
  "name": "FGES MASTER - M2 III"
}

r = requests.post(url = (API_ENDPOINT + '/promo'), data = PROMO, headers=hed)
print("INSERTION PROMO :\n %s \n"%r.text)


# Recuperation de l'id de la promo et ajout d'etudiant a la promo / Recuperation d'un id TEACHER
r = requests.get(url = (API_ENDPOINT + '/promo'), headers=hed)
promos = r.json()
idIntPromo = promos[0]['id']
idStrPromo = str(idIntPromo)
r = requests.get(url = (API_ENDPOINT + '/user'), headers=hed)
users = r.json()

for user in users:
  if user['key'] != "" and user['role'] == "STUDENT":
    r = requests.post(url = (API_ENDPOINT + '/promo/' + idStrPromo +'/addStudent/' + str(user['id'])), headers=hed)
    print("AJOUT DE %s A LA PROMO %s : %s \n"%(user['firstName'],promos[0]['name'],r.text))
  elif user['role'] == "TEACHER":
    idTeacher = user['id']
    print("pas de key ou pas de role STUDENT pour %s \n"%user['firstName'])
  else :
    print("pas de key ou pas de role STUDENT pour %s \n"%user['firstName'])

# Insertion de cours pour une semaine
COURSE1 = {
  "name": "RESEAU",
  "idClassroom": idClassroom,
  "idTeacher": idTeacher,
  "idPromo": idIntPromo,
  "hourBeginning": "2019-06-05T08:00:00.238Z",
  "hourEnding": "2019-06-05T18:00:00.238Z"
}

COURSE2 = {
  "name": "BIG DATA",
  "idClassroom": idClassroom,
  "idTeacher": idTeacher,
  "idPromo": idIntPromo,
  "hourBeginning": "2019-06-06T08:00:00.238Z",
  "hourEnding": "2019-06-06T18:00:00.238Z"
}

COURSE3 = {
  "name": "PROJET DE GROUPE",
  "idClassroom": idClassroom,
  "idTeacher": idTeacher,
  "idPromo": idIntPromo,
  "hourBeginning": "2019-06-07T08:00:00.238Z",
  "hourEnding": "2019-06-07T18:00:00.238Z"
}

COURSE4 = {
  "name": "EXAM RESEAU",
  "idClassroom": idClassroom,
  "idTeacher": idTeacher,
  "idPromo": idIntPromo,
  "hourBeginning": "2019-06-11T08:00:00.238Z",
  "hourEnding": "2019-06-11T18:00:00.238Z"
}

COURSE5 = {
  "name": "PROJET PERSO",
  "idClassroom": idClassroom,
  "idTeacher": idTeacher,
  "idPromo": idIntPromo,
  "hourBeginning": "2019-06-12T08:00:00.238Z",
  "hourEnding": "2019-06-12T18:00:00.238Z"
}

COURSE6 = {
  "name": "PROJET PROFESSIONNEL",
  "idClassroom": idClassroom,
  "idTeacher": idTeacher,
  "idPromo": idIntPromo,
  "hourBeginning": "2019-06-13T08:00:00.238Z",
  "hourEnding": "2019-06-13T18:00:00.238Z"
}

print(COURSE1)
r = requests.post(url = (API_ENDPOINT + '/course'), data = COURSE1, headers=hed)
print("INSERTION COURSE1 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/course'), data = COURSE2, headers=hed)
print("INSERTION COURSE2 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/course'), data = COURSE3, headers=hed)
print("INSERTION COURSE3 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/course'), data = COURSE4, headers=hed)
print("INSERTION COURSE4 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/course'), data = COURSE5, headers=hed)
print("INSERTION COURSE5 :\n %s \n"%r.text)
r = requests.post(url = (API_ENDPOINT + '/course'), data = COURSE6, headers=hed)
print("INSERTION COURSE6 :\n %s \n"%r.text)

print("INSERTION DU JEU DE DONNEES TERMINE")






