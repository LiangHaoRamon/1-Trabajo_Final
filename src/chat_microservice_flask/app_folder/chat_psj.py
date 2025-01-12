from langchain_ollama import ChatOllama

##########################################################################################
import os
import traceback
import numpy as np
from PIL import Image
from transformers import pipeline

# Obtener el nombre del script actual
nombre_script = os.path.basename(__file__)
# Mostrar el nombre del script
print(f"El nombre del script que se está ejecutando es: {nombre_script}")
##########################################################################################

ip_ollama = 'ollama_context:11434'
project_base_url = f'http://{ip_ollama}'

# Inicializar el modelo de lenguaje
llm = ChatOllama(base_url=project_base_url, model='mistral', temperature=1)
personaje = "Kaladin"
input_text = f"Hola, soy {personaje}. ¿De que quieres hablar hoy?"
prompt_del_sistema = ("Eres Kaladin Bendito por la tormenta. Personaje fictiio de El Archivo de las Tormentas \
                      saga de Brandon Sanderson. Kaladin es un soldado, capitán de la cuadrilla de puentes número 4. \
                      Eres hijo de Lirin el cirujano. Tiene instrucción en medicina y en combate con lanza. \
                      A parte de eso, es una persona seria, tosaca y algo malhumorada. Responde de forma correcta \
                      y completa, pero cortante. Tiene un dilema interno entre salvar o matar, matar para proteger \
                      o no. Debes responder de forma detallada a cada mensaje como lo haría Kaladin, acorde a la forma de ser de su personaje. Debes \
                      empezar las frases negativas con la interjección 'Tormentas!' y cuando algo tenga que ver con \
                      un chico joven di que no quieres hablar de nada que te recuerde a Tien, tu hermano."\
                      )

def query_text(pregunta, prompt_del_sistema=prompt_del_sistema):
    try:
        messages = [prompt_del_sistema]
        messages.append(("human", pregunta))
        ai_msg = llm.invoke(messages)
        messages.append(("system", ai_msg.content))
        #print(ai_msg.content)
        print("---------- Text Query Done ----------")
    except:
        traceback.print_exc()
    return [(("human", pregunta)), (("system", ai_msg.content))]

def get_response_personality(char, personality, question):
    try:
        pers_prompt = "Eres " + char + ", un personaje ficticio del universo literario de Brandon Sanderson, el Cosmere, y esta es tu personalidad: " + personality + ". Responde como si fueras " + char + " y tuvieses esa personalidad, no te salgas del personaje."
        messages = [pers_prompt]
        messages.append(("human", question))
        ai_msg = llm.invoke(messages)
        messages.append(("system", ai_msg.content))
        #print(ai_msg.content)
        print("---------- Text Query Done ----------")
    except:
        traceback.print_exc()
    return [(("human", question)), ((char+": ", ai_msg.content))]

def run():
    print("========================================")
    print("Terminado")


if __name__ == "__main__":
    run()
