---
title: "Como funciona — DoneAt"
description: "Como o DoneAt lida com turnos noturnos e como a taxa horária é derivada de um salário mensal usando 21,75 dias úteis."
heading: "Como funciona"
intro: "A aritmética por trás da contagem regressiva, da barra de progresso e do valor dos ganhos, para que você possa verificar se os números correspondem ao seu contrato."
---

## Definindo um turno

Um turno é um horário de início e um horário de fim. Quando você inicia a contagem regressiva, ambos são ancorados no dia de hoje e o temporizador corre até o final desse turno.

Se o horário de fim for anterior ao de início, o turno cruza a meia-noite. Um turno das 22:00 às 06:00 aberto à 01:00 pertence à noite que já começou, não a uma nova que começa esta noite, então o tempo restante é cinco horas em vez de vinte e nove.

## A barra de progresso

O progresso é a parte do turno que já passou, medida em relação à sua duração total em vez de oito horas fixas. Um turno de seis horas e um de doze horas leem 50% na metade.

O valor fica entre 0 e 100, então chegar cedo ou ficar até tarde nunca empurra a barra para fora de sua faixa.

## Convertendo um salário mensal em taxa diária

Se você inserir um salário mensal, ele é convertido em uma taxa diária antes de ser distribuído pelo turno. O divisor padrão é 21,75 dias úteis por mês.

Esse número não é arbitrário. Um ano tem 365 dias, dos quais 104 caem em fins de semana, deixando 261 dias úteis. Dividido por doze meses, isso é exatamente 21,75. É a base salarial mensal prescrita por regulamento na China continental. Se você trabalha em outro lugar, ou seu contrato conta diferente, trate como ponto de partida em vez de regra — seu próprio contrato é o que decide.

Se seu contrato conta diferente, por exemplo uma semana de seis dias ou de quatro dias, altere os dias úteis por mês e todos os valores se atualizam. Inserir um salário diário pula essa etapa.

## Ganhos durante o turno

O valor mostrado é a taxa diária multiplicada pela proporção do turno completada, atualizada a cada segundo. Na metade você ganhou metade da taxa diária; quando a contagem regressiva chega a zero, o valor total é mostrado.

Essa é uma estimativa linear. Não modela multiplicadores de horas extras, pausas não pagas, bônus, impostos ou previdência social, então trate como uma sensação de progresso em vez de holerite.

## Onde seus dados ficam

Seus horários, salário e preferências são armazenados no dispositivo que você está usando por padrão. No iPhone e iPad, você pode sincronizá-los pelo seu banco de dados privado do iCloud. Mac, Windows e o temporizador web permanecem locais e não se juntam a essa sincronização. O DoneAt não envia esses dados para seus próprios servidores.

Como a contagem regressiva e a estimativa de ganhos são calculadas localmente, o DoneAt também funciona sem conexão uma vez que foi carregado ou instalado. Limpar os dados locais remove a cópia desse dispositivo; se a sincronização com o iCloud estiver ativada, use as configurações de Registros e dados para remover a cópia sincronizada separadamente.
