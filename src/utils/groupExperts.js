export default function groupExperts (experts) {
    const output = {
        expertise : {},
        institution : {},
        exam : {},
    };
    
    for(let i=0; i<experts.length; i++) {
        const expert = experts[i];
        console.log(output.institution[expert.institution.split(',')[0]] === undefined);
        if (output.institution[expert.institution.split(',')[0]] === undefined) {
            output.institution[expert.institution.split(',')[0]] = [];
        }
        output.institution[expert.institution.split(',')[0]].push(expert);
        if (output.expertise[expert.branch] === undefined) {
            output.expertise[expert.branch] = [];
        }
        output.expertise[expert.branch].push(expert);
    }

    return output;
}
