import React, { useState } from 'react'
import Steps from './Steps'
import StepDescription from './StepDescription';
import StepDescr2 from './StepDescr2';

const ProcessSections = () => {
    const initialStepsState = [
        { stepNumber: "I", title: "Sélection d'une entreprise installatrice", description: <StepDescription />, isOpen: true },
        { stepNumber: "II", title: "Sélection de l'entreprise partenaire", description: <StepDescr2 />, isOpen: false },
        { stepNumber: "III", title: "Étude des besoins et du site", description: "Cette étape consiste à sélectionner une entreprise installatrice (ou un bureau d’études) qualifiée pour réaliser une étude des besoins en consommation électrique, élaborer un dimensionnement et proposer une offre pour le système à installer et à réaliser l’étude de préfaisabilité. Ce ne sont pas des procédures réglementaires, elles ne sont pas indispensables d’un point de vue administratif, mais la réalisation de ces tâches concours au bon développement du projet et certaines études menées à cette sous-étape pourront être nécessaire dans les procédures suivantes (par exemple, des données techniques sur le projet et la pertinence du projet sont nécessaires pour obtenir l’accord ministériel ou encore les factures des équipements qui seront demandés dans le cadre de l’étape 3 de subventions et des  incitations).", isOpen: false },
        { stepNumber: "IV", title: "Site exploitable?", description: "s ne sont pas indispensables d’un point de vue administratif, mais la réalisation de ces tâches concours au bon développement du projet et certaines études menées à cette sous-étape pourr", isOpen: false },
        { stepNumber: "V", title: "Étude de préfaisabilité", description: "Cette étape implique la sélection...", isOpen: false },
    ];
    const [steps, setSteps] = useState(initialStepsState);

    const toggleStep = (index) => {
        const newSteps = steps.map((step, i) => {
            if (i === index) {
                return { ...step, isOpen: !step.isOpen };
            }
            return step;
        });
        setSteps(newSteps);
    };


    return (
        <div className="process-steps">
            {steps.map((step, index) => (
                <Steps
                    key={index}
                    stepNumber={step.stepNumber}
                    title={step.title}
                    description={step.description}
                    isOpen={step.isOpen}
                    onClick={() => toggleStep(index)}
                >
                </Steps>
            ))}
        </div>
    );
};

export default ProcessSections
