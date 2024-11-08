import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Progress } from "~/components/ui/progress";
import { Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

type Inputs = {
  title: string;
  description: string;
  link?: string;
  logo: string;
  bannerImage: string;
  workScope: string;
  contributors: string;
};
function FormComponent() {
  const tabs = ["General", "Who did what & when", "Mint"];
  const [activeTab, setActivetab] = useState(0);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 10, 8),
    to: addDays(new Date(2024, 10, 9), 0),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>();

  const handleNextClick = () => {
    if (activeTab >= 0 && activeTab < tabs.length) {
      setActivetab((p) => p + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousClick = () => {
    if (activeTab > 0) {
      setActivetab((p) => p - 1);
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className={`w-[500px] block mt-[20px]`}>
      <div className={`w-full h-fit space-y-3`}>
        <Progress
          value={33.3 * (activeTab + 1)}
          className={`w-[95%] block mx-auto h-[8px]`}
        />
        <div className={`flex items-center justify-between px-[30px]`}>
          {tabs.map((tab, i) => (
            <div
              className={`inline-flex items-center gap-x-3 py-2 px-3 rounded-lg ${
                activeTab === i && "bg-[#f1f5f9]"
              }`}
              key={tab}
            >
              <div
                className={`flex justify-center items-center w-[28px] h-[20px] ${
                  activeTab === i && "bg-purple-500 border-0"
                } rounded-[10px] border`}
              >
                <p
                  className={`text-[14px] text-[#778599] ${
                    activeTab === i && "text-white"
                  } font-semibold`}
                >
                  {i + 1}
                </p>
              </div>
              <p
                className={`text-[16px] ${
                  activeTab === i && "font-bold text-neutral-700"
                } text-[#778599]`}
              >
                {tab}
              </p>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full p-3 space-y-5 mt-[40px]`}
      >
        {activeTab === 0 && (
          <>
            <fieldset className={`w-full space-y-1`}>
              <label
                htmlFor="title"
                className={`text-[15px] font-bold text-purple-500`}
              >
                Title
              </label>
              <input
                {...register("title", { required: true })}
                className={`w-full h-[40px] rounded-lg border px-2`}
              />
              <p className={`text-[#778599] text-[13px]`}>
                Keep it short but descriptive
              </p>
            </fieldset>
            <fieldset className={`w-full space-y-1`}>
              <label
                htmlFor="description"
                className={`text-[15px] font-bold text-purple-500`}
              >
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                className={`w-full h-[90px] rounded-lg border p-2`}
              />
              <p className={`text-[#778599] text-[13px]`}>
                Describe your project: why it was created, and how it works
              </p>
            </fieldset>
            <fieldset className={`w-full space-y-1`}>
              <label
                htmlFor="link"
                className={`text-[15px] font-bold text-purple-500`}
              >
                Link (optional)
              </label>
              <input
                placeholder="https://"
                {...register("link")}
                className={`w-full h-[40px] rounded-lg border px-2`}
              />
              <p className={`text-[#778599] text-[13px]`}>
                Paste a link to your impact report or your project
              </p>
            </fieldset>
            <fieldset className={`w-full space-y-1`}>
              <label
                htmlFor="logo"
                className={`text-[15px] font-bold text-purple-500`}
              >
                Logo
              </label>
              <input
                placeholder="https://"
                {...register("logo")}
                className={`w-full h-[40px] rounded-lg border px-2`}
              />
              <p className={`text-[#778599] text-[13px]`}>
                The URL to your project logo
              </p>
            </fieldset>
            <fieldset className={`w-full space-y-1`}>
              <label
                htmlFor="bannerImage"
                className={`text-[15px] font-bold text-purple-500`}
              >
                Banner image
              </label>
              <input
                placeholder="https://"
                {...register("bannerImage")}
                className={`w-full h-[40px] rounded-lg border px-2`}
              />
              <p className={`text-[#778599] text-[13px]`}>
                The URL to an image to be displayed as the banner
              </p>
            </fieldset>
          </>
        )}
        {activeTab === 1 && (
          <>
            <fieldset className={`w-full space-y-1`}>
              <label htmlFor="date" className={``}>
                Time of work
              </label>
              <div className={`block`}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <p className={`text-[#778599] text-[13px]`}>
                The start and end date of the work represented by the hypercert
              </p>
            </fieldset>
            <fieldset className={`w-full space-y-1`}>
              <label
                htmlFor="workScope"
                className={`text-[15px] font-bold text-purple-500`}
              >
                Work Scope
              </label>
              <textarea
                placeholder="Seperate tags with commas"
                {...register("workScope", { required: true })}
                className={`w-full h-[90px] rounded-lg border p-2`}
              />
              <p className={`text-[#778599] text-[13px]`}>
                Tags are used to categorize your project. (Max: 20)
              </p>
            </fieldset>
            <fieldset className={`w-full space-y-1`}>
              <label
                htmlFor="contributors"
                className={`text-[15px] font-bold text-purple-500`}
              >
                Contributors
              </label>
              <textarea
                placeholder="Seperate contributors with commas"
                {...register("contributors", { required: true })}
                className={`w-full h-[90px] rounded-lg border p-2`}
              />
              <p className={`text-[#778599] text-[13px]`}>
                Tags are used to categorize your project. (Max: 20)
              </p>
            </fieldset>
          </>
        )}
        {activeTab === 2 && <></>}
        <div className={`flex w-full h-[80px] items-center justify-between`}>
          {activeTab > 0 && (
            <button
              onClick={handlePreviousClick}
              type="button"
              className={`hover:bg-[#e7eff3] hover:border-0 active:translate-y-[2px] h-[40px] w-[100px] border flex items-center text-neutral-700 justify-center space-x-2 rounded-lg`}
            >
              <ArrowLeft size={15} />
              <p>Previous</p>
            </button>
          )}
          <button
            onClick={() => reset()}
            type="button"
            className={`bg-purple-500 hover:opacity-[0.8] active:translate-y-[2px] h-[40px] w-[100px] flex items-center text-white justify-center space-x-2 rounded-lg`}
          >
            <Trash2 size={15} />
            <p>Reset</p>
          </button>

          {activeTab + 1 !== tabs.length && (
            <button
              onClick={handleNextClick}
              type="button"
              className={`bg-purple-500 hover:opacity-[0.8] active:translate-y-[2px] h-[40px] w-[100px] flex items-center text-white justify-center space-x-2 rounded-lg`}
            >
              <p>Next</p>
              <ArrowRight size={15} />
            </button>
          )}
          {activeTab + 1 === tabs.length && (
            <button
              type="button"
              className={`bg-purple-500 hover:opacity-[0.8] active:translate-y-[2px] h-[40px] w-[100px] flex items-center text-white justify-center rounded-lg`}
            >
              Mint
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default FormComponent;
