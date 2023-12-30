# Verwende ein offizielles Node.js-Image als Basis
FROM node:14

# Erstelle das Arbeitsverzeichnis
WORKDIR /usr/src/app

# Kopiere die Abhängigkeiten und das Anwendungscode in das Arbeitsverzeichnis
COPY package*.json ./
RUN npm install
COPY . .

# Setze die Standardumgebungsvariable für den Port
ENV PORT=3000
ENV HTTPS_PORT=3001

EXPOSE $PORT
EXPOSE $HTTPS_PORT


# Starte die Anwendung
CMD ["node", "app.js"]