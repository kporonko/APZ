import React from 'react';
import {IGameFull} from "../interfaces/IGameFull";
import LocalizedStrings from "react-localization";

const GameAnalysis = (props:{
    game: IGameFull
}) => {

    const strings = new LocalizedStrings({
        en:{
            avgGood: "The average heartbeat value is within the normal range. Good job!\n",
            avgLow: "The average heartbeat value is below the normal range.\n",
            avgHigh: "The average heartbeat value is above the normal range.\n",
            avgRangeBad: "The average heartbeat value is not within the normal range.\n",
            avgRangeGood: "The average heartbeat value is within the normal range.\n",
            recommendationHeader: "Here are some recommendations for you:\n",
            timesLowerNull: "You have no heartbeat values below the normal range.\n",
            timesLowerExist: "You have had {0} heartbeat values below the normal range.\n",
            timesHigherNull: "You have no heartbeat values above the normal range.\n",
            timesHigherExist: "You have had {0} heartbeat values above the normal range.\n",
            good: "Good job!\n",
            avgLowRecomendation1: "Incorporate regular cardiovascular exercises into your routine outside of gaming sessions. Activities such as jogging, cycling, or swimming can help increase your heart rate and improve cardiovascular fitness, resulting in a higher heartbeat during gaming.\n",
            avgLowRecomendation2: "Opt for games or game modes that require higher levels of physical activity or intensity. Games that involve more physical movement or fast-paced gameplay can naturally elevate your heart rate during gaming sessions.",
            avgLowRecomendation3: "Ensure proper hydration by drinking water before and during gaming sessions. Dehydration can lead to a lower heart rate, so staying hydrated can help maintain a higher heartbeat during gaming.",
            avgLowRecomendation4: "Create a more stimulating gaming environment by adjusting factors such as screen brightness, sound effects, or music. Higher sensory stimulation can increase excitement and potentially elevate your heart rate while gaming.\n",
            avgLowRecomendation5: "During gaming sessions, intersperse high-intensity bursts of activity or gameplay with periods of rest or lower intensity. This approach mimics interval training and can help elevate your heart rate during the active phases.\n",
            avgHighRecomendation1: "Incorporate relaxation techniques such as deep breathing exercises, progressive muscle relaxation, or meditation before and during gaming sessions. These techniques can help reduce stress and promote a lower heartbeat.\n",
            avgHighRecomendation2: "Find effective ways to manage stress in your daily life. Engage in activities outside of gaming that help you relax and unwind, such as exercise, hobbies, spending time with loved ones, or listening to calming music. Lowering overall stress levels can contribute to a lower heartbeat during gaming sessions.\n",
            avgHighRecomendation3: "Create a calm and comfortable gaming environment. Ensure proper lighting, adjust the screen brightness to a comfortable level, and consider using ergonomic seating. A soothing environment can help promote relaxation and a lower heartbeat.\n",
            avgHighRecomendation4: "Incorporate regular breaks during gaming sessions. Stand up, stretch, and walk around to give your body and heart a rest. Prolonged periods of intense gaming can elevate the heartbeat, so taking breaks can help maintain a lower heart rate.\n",
            avgHighRecomendation5: "Prioritize physical activity outside of gaming sessions. Regular exercise, such as cardiovascular exercises, can improve heart health and contribute to a lower resting heart rate overall. Aim for at least 30 minutes of moderate-intensity exercise on most days of the week.\n",
            rangeRecommendation1: "Engage in regular physical activity and exercise outside of gaming sessions. Regular exercise helps improve cardiovascular health and can contribute to a more stable heartbeat during gaming sessions.\n",
            rangeRecommendation2: "Schedule periodic breaks during gaming sessions to allow your body and mind to rest. Prolonged periods of intense gaming can lead to increased heart rate and potential fluctuations. Taking breaks helps prevent excessive strain on the cardiovascular system.\n",
            rangeRecommendation3: "Incorporate relaxation techniques such as deep breathing exercises, meditation, or mindfulness techniques into your gaming routine. These techniques can help calm your body and mind, promoting a more stable heartbeat.\n",
            rangeRecommendation4: "Drink enough water to stay properly hydrated while gaming. Dehydration can affect heart function and potentially lead to irregular heartbeat patterns. Ensure you have a water bottle nearby and drink regularly to maintain hydration levels.\n",
            rangeRecommendation5: "Create a comfortable and ergonomic gaming environment. Ensure proper lighting, adjust the screen brightness, and maintain a comfortable seating position. A comfortable and supportive gaming setup can help reduce physical and mental stress, contributing to a more stable heartbeat.\n",
        },
        ru: {
            avgGood: "Середній пульс знаходиться в нормі. Гарна робота!\n",
            avgLow: "Середній пульс знаходиться нижче норми.\n",
            avgHigh: "Середній пульс знаходиться вище норми.\n",
            avgRangeBad: "Діапазон коливання серцебиття дуже великий.\n",
            avgRangeGood: "Діапазон коливання серцебиття в межах норми.\n",
            recommendationHeader: "Ось деякі рекомендації для вас:\n",
            timesLowerNull: "У вас немає значень пульсу нижче норми.\n",
            timesLowerExist: "У вас було {0} значень пульсу нижче норми.\n",
            timesHigherNull: "У вас немає значень пульсу вище норми.\n",
            timesHigherExist: "У вас було {0} значень пульсу вище норми.\n",
            good: "Гарна робота!\n",
            avgLowRecomendation1: "Включіть регулярні серцево-судинні вправи у свій розпорядок дня поза ігровими сесіями. Такі вправи, як біг підтюпцем, їзда на велосипеді або плавання, допоможуть збільшити частоту серцевих скорочень і покращити серцево-судинну форму, що призведе до частішого серцебиття під час гри.\n",
            avgLowRecomendation2: "Обирайте ігри або ігрові режими, які вимагають вищого рівня фізичної активності або інтенсивності. Ігри, які передбачають більше фізичних рухів або швидкий ігровий процес, можуть природним чином підвищувати частоту серцевих скорочень під час ігрових сесій.\n",
            avgLowRecomendation3: "Забезпечте належну гідратацію, вживаючи воду до та під час ігрових сесій. Зневоднення може призвести до зниження частоти серцевих скорочень, тому підтримання гідратації може допомогти підтримувати високу частоту серцебиття під час гри.\n",
            avgLowRecomendation4: "Створіть більш стимулююче ігрове середовище, налаштувавши такі фактори, як яскравість екрану, звукові ефекти або музику. Підвищена сенсорна стимуляція може посилити збудження і потенційно підвищити частоту серцевих скорочень під час гри.\n",
            avgLowRecomendation5: "Під час ігрових сесій чергуйте високоінтенсивні сплески активності або ігрового процесу з періодами відпочинку або меншої інтенсивності. Такий підхід імітує інтервальні тренування і може допомогти підвищити частоту серцевих скорочень під час активних фаз.\n",
            avgHighRecomendation1: "Використовуйте техніки релаксації, такі як вправи на глибоке дихання, прогресивне розслаблення м'язів або медитацію до і під час ігрових сесій. Ці техніки можуть допомогти зменшити стрес і сприяти зниженню частоти серцебиття.\n",
            avgHighRecomendation2: "Знайдіть ефективні способи управління стресом у вашому повсякденному житті. Займайтеся діяльністю поза іграми, яка допомагає розслабитися і відпочити, наприклад, фізичними вправами, хобі, проводьте час з коханими або слухайте заспокійливу музику. Зниження загального рівня стресу може сприяти зниженню частоти серцебиття під час ігрових сесій.\n",
            avgHighRecomendation3: "Створіть спокійне і комфортне ігрове середовище. Забезпечте належне освітлення, відрегулюйте яскравість екрану до комфортного рівня і подумайте про використання ергономічних сидінь. Заспокійливе середовище може сприяти розслабленню та зниженню серцебиття.\n",
            avgHighRecomendation4: "Робіть регулярні перерви під час ігрових сесій. Встаньте, потягніться і пройдіться, щоб дати тілу і серцю відпочити. Тривалі періоди інтенсивної гри можуть призвести до почастішання серцебиття, тому перерви допоможуть знизити частоту серцевих скорочень.\n",
            avgHighRecomendation5: "Надавайте пріоритет фізичній активності поза ігровими сесіями. Регулярні фізичні вправи, такі як серцево-судинні вправи, можуть покращити здоров'я серця і сприяти зниженню частоти серцевих скорочень у стані спокою в цілому. Прагніть приділяти щонайменше 30 хвилин фізичним вправам помірної інтенсивності в більшість днів тижня\n",
            rangeRecommendation1: "Займайтеся регулярною фізичною активністю та вправами поза ігровими сесіями. Регулярні фізичні вправи допомагають поліпшити здоров'я серцево-судинної системи і можуть сприяти більш стабільному серцебиттю під час ігрових сесій.\n",
            rangeRecommendation2: "Заплануйте періодичні перерви під час ігрових сесій, щоб дати можливість вашому тілу та розуму відпочити. Тривалі періоди інтенсивної гри можуть призвести до збільшення частоти серцебиття і потенційних коливань. Перерви допомагають запобігти надмірному навантаженню на серцево-судинну систему.\n",
            rangeRecommendation3: "Включіть техніки релаксації, такі як вправи на глибоке дихання, медитація або техніки усвідомленості, у свою ігрову рутину. Ці техніки можуть допомогти заспокоїти ваше тіло і розум, сприяючи більш стабільному серцебиттю під час ігрових сесій.\n",
            rangeRecommendation4: "Пийте достатньо води, щоб залишатися належним чином зволоженим під час гри. Зневоднення може вплинути на роботу серця і потенційно призвести до нерегулярного серцебиття. Переконайтеся, що у вас поруч є пляшка з водою, і регулярно пийте, щоб підтримувати рівень гідратації.\n",
            rangeRecommendation5: "Створіть комфортне та ергономічне ігрове середовище. Забезпечте належне освітлення, відрегулюйте яскравість екрану та підтримайте зручне положення сидіння. Зручне та сприятливе ігрове середовище може допомогти зменшити фізичне та психічне навантаження, сприяючи більш стабільному серцебиттю.\n",
        }
    })

    const getIsAvgGoodAnalysis = () => {
        let higher = props.game.analysis.isAverageHigher;
        let lower = props.game.analysis.isAverageLower;

        let text: string = "";

        if (higher) {
            text += strings.avgHigh;
        }
        else if (lower) {
            text += strings.avgLow;
        }
        console.log(strings.avgHigh);
        console.log(text);
        return text;
    }

    function getRandomElements<T>(array: T[], count: number) {
        const shuffled = array.slice();
        let currentIndex = shuffled.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle
        while (currentIndex !== 0) {
            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Swap it with the current element
            temporaryValue = shuffled[currentIndex];
            shuffled[currentIndex] = shuffled[randomIndex];
            shuffled[randomIndex] = temporaryValue;
        }

        // Return the first 'count' elements
        return shuffled.slice(0, count);
    }

    const getRandomRecommendationAvgHigh = () => {
        let recommendations = [
            strings.avgHighRecomendation1,
            strings.avgHighRecomendation2,
            strings.avgHighRecomendation3,
            strings.avgHighRecomendation4,
            strings.avgHighRecomendation5
        ]

        return getRandomElements(recommendations, 3);
    }

    const getRandomRecommendationAvgLow = () => {
        let recommendations = [
            strings.avgLowRecomendation1,
            strings.avgLowRecomendation2,
            strings.avgLowRecomendation3,
            strings.avgLowRecomendation4,
            strings.avgLowRecomendation5
        ]

        return getRandomElements(recommendations, 3);
    }

    const getIsRangeGoodAnalysis = () => {
        let isGood = props.game.analysis.isRangeGood;

        let text: string = "";

        if (isGood) {
            text += strings.avgRangeGood;
        }
        else if (!isGood) {
            text += strings.avgRangeBad;
        }
        console.log(strings.avgHigh);
        console.log(text);
        return text;
    }

    const getRandomRecommendationRange = () => {
        let recommendations = [
            strings.rangeRecommendation1,
            strings.rangeRecommendation2,
            strings.rangeRecommendation3,
            strings.rangeRecommendation4,
            strings.rangeRecommendation5
        ]

        return getRandomElements(recommendations, 3);
    }

    const getTimesMoreMaxHeartBeatAnalysis = () => {
        let analysis = props.game.analysis.timesMoreMaxHeartBeat;
        let text: string = "";

        if (analysis === 0) {
            text += strings.timesHigherNull + analysis + strings.good;
        }
        else if (analysis > 0) {
            const timesHigherExist = strings.timesHigherExist;
            const formattedString = timesHigherExist.replace("{0}", analysis.toString());
            text += formattedString;
        }
        return text;
    }

    const getTimesLowerMinimumHeartBeatAnalysis = () => {
        let analysis = props.game.analysis.timesLowerMinimumHeartBeat;
        let text: string = "";

        console.log(analysis);
        if (analysis === 0) {
            text += strings.timesLowerNull + analysis + strings.good;
        }
        else if (analysis > 0) {
            const timesLowerExist = strings.timesLowerExist;
            const formattedString = timesLowerExist.replace("{0}", analysis.toString());
            text += formattedString;
        }
        return text;
    }


    return (
        <div>
            <div className={props.game.analysis.isAverageHigher || props.game.analysis.isAverageLower ? "red-bc header-analysis" : "green-bc header-analysis"}>
                {getIsAvgGoodAnalysis()}
            </div>
            <div>
                <h3>{props.game.analysis.isAverageLower ? getRandomRecommendationAvgLow().map((item) => (
                    <ul className={"list-item-recomm"}>
                        <li>{item}</li>
                    </ul>
                    )) : props.game.analysis.isAverageHigher ? getRandomRecommendationAvgHigh() : ""}</h3>
            </div>
            <div className={props.game.analysis.isRangeGood ? "green-bc header-analysis" : "red-bc header-analysis"}>
                {getIsRangeGoodAnalysis()}
            </div>
            <div>
                <h3>{!props.game.analysis.isRangeGood && getRandomRecommendationRange().map((item) => (
                    <ul className={"list-item-recomm"}>
                        <li>{item}</li>
                    </ul>
                ))}</h3>
            </div>

            <div className={props.game.analysis.timesLowerMinimumHeartBeat < 0 ? "green-bc header-analysis" : "red-bc header-analysis"}>
                {getTimesLowerMinimumHeartBeatAnalysis()}
            </div>

            <div>
                <h3>{props.game.analysis.timesLowerMinimumHeartBeat > 0 && getRandomRecommendationAvgLow().map((item) => (
                    <ul className={"list-item-recomm"}>
                        <li>{item}</li>
                    </ul>
                ))}</h3>
            </div>

            <div className={props.game.analysis.timesMoreMaxHeartBeat < 0 ? "green-bc header-analysis" : "red-bc header-analysis"}>
                {getTimesMoreMaxHeartBeatAnalysis()}
            </div>

            <div>
                <h3>{props.game.analysis.timesMoreMaxHeartBeat > 0 && getRandomRecommendationAvgHigh().map((item) => (
                    <ul className={"list-item-recomm"}>
                        <li>{item}</li>
                    </ul>
                ))}</h3>
            </div>
        </div>
    );
};

export default GameAnalysis;