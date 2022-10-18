const d = document;

export default function formValidation(){
    const $submit = d.querySelector("input[type= 'submit']"),
        $inputs = d.querySelectorAll(".sign-up__form input[required]"),
        $alerts = d.querySelectorAll("span.alert-icon");

    $inputs.forEach(input =>{
        const $p = d.createElement("p");
        $p.id = input.name;
        //$p.textContent = input.title;
        $p.classList.add("form-error", "hidden");
        input.insertAdjacentElement("afterend", $p);
    })


    $submit.addEventListener("click", e=>{
        $inputs.forEach(input =>{
            let $title = input.title,
                $pattern = input.pattern,
                $alert = d.getElementById(input.name);

            if(input.value == ""){
                $alert.textContent = $title;
                $alert.classList.remove("hidden");
                input.classList.add("invalid");
                $alert.nextElementSibling.classList.remove("hidden");
            }

            if(input.value !== ""){
                $alert.textContent = `Looks like this is not a valid ${input.name}`;
                let regex = new RegExp($pattern);
                if(!regex.exec(input.value)){
                    $alert.classList.remove("hidden");
                    input.classList.add("invalid");
                    $alert.nextElementSibling.classList.remove("hidden");
                }

                if(regex.exec(input.value)){
                    $alert.classList.add("hidden");
                    input.classList.remove("invalid");
                    $alert.nextElementSibling.classList.add("hidden");
                }
                
            }
        })
    })

    d.addEventListener("keyup", e => {
        if(e.target.matches("input[required]")){
            
            let $input = e.target,
                 pattern = $input.pattern,
                 $alert = d.getElementById($input.name),
                 regex = new RegExp(pattern);

             if ($input.value !== ""){
                if(regex.exec($input.value)){
                    $alert.classList.add("hidden");
                    $input.classList.remove("invalid");
                    $alert.nextElementSibling.classList.add("hidden");
                }
             }

        }
    })
}