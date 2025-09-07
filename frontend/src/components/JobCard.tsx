interface Job {
  id: number;
  title: string;
  city: string;
  type: string;
  company?: {
    name: string;
  };
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="p-4 bg-white shadow rounded-2xl hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.company?.name}</p>
      <p className="text-sm text-gray-500">
        {job.city} · {job.type}
      </p>
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Подробнее
      </button>
    </div>
  );
}
